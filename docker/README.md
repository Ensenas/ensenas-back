# DEVOPS

1. Build app image

```bash
docker build --platform linux/amd64 -t ensenas-dev -f docker/dockerfile.app.yml .
```

2. Tag image

```bash
docker tag ensenas-dev:latest alejol2019/ensenas-dev:latest
```

2. Upload image to docker hub

```bash
docker push alejol2019/ensenas-dev:tagname
```

You will not be able to upload image if you´re not added as collaborator in docker hub.

3. Pull image from server

```bash
docker pull alejol2019/ensenas-dev
```
