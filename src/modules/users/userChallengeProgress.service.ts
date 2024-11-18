import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserChallengeProgress } from './models/userChallengeProgress.entity'
import { User } from './models/user.entity'
import { Challenge } from '../challenges/challenge.entity'
import { CompleteChallengeDto } from '../challenges/dto/complete-challenge.dto'

@Injectable()
export class UserChallengeProgressService {
  constructor(
    @InjectRepository(UserChallengeProgress)
    private userChallengeProgressRepository: Repository<UserChallengeProgress>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Challenge) private challengeRepository: Repository<Challenge>,
  ) {}

  async findOrUpdateProgress(
    user: User,
    completeChallengeDto: CompleteChallengeDto,
  ): Promise<UserChallengeProgress[]> {
    const { challengeId, result } = completeChallengeDto

    // Buscar el progreso si ya existe
    let progress = await this.userChallengeProgressRepository.findOne({
      where: {
        user: { id: user.id },
        challenge: { id: challengeId },
      },
    })

    if (!progress) {
      // Crear un nuevo progreso si no existe
      const challenge = await this.challengeRepository.findOne({ where: { id: challengeId } })
      if (!challenge) {
        throw new NotFoundException('Challenge not found')
      }

      progress = this.userChallengeProgressRepository.create({
        user,
        challenge,
        started: true,
        completed: result, // Si el resultado es `true`, el desafío se marca como completado
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      await this.userChallengeProgressRepository.save(progress)
      return [progress]
    } else {
      // Si ya existe, actualizar según el resultado
      if (result) {
        progress.completed = true
      }
      progress.updatedAt = new Date()

      // Guardar el progreso actualizado y retornar
      await this.userChallengeProgressRepository.save(progress)
      return [progress]
    }
  }

  async getProgressByUser(user: User): Promise<UserChallengeProgress[]> {
    return await this.userChallengeProgressRepository.find({
      where: {
        user: { id: user.id },
      },
      relations: ['challenge'], // Trae también los detalles del desafío
    })
  }
}
