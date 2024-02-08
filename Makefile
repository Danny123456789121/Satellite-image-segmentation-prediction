DOCKER_IMAGE_NAME = danielkurth024/sis-react
DOCKER_CONTAINER_NAME = sis-react-container

build:
	docker build -t $(DOCKER_IMAGE_NAME) .

run:
	docker run -d -p 5000:5000 --name $(DOCKER_CONTAINER_NAME) $(DOCKER_IMAGE_NAME)

stop:
	docker stop $(DOCKER_CONTAINER_NAME)
	docker rm $(DOCKER_CONTAINER_NAME)

clean:
	docker rmi $(DOCKER_IMAGE_NAME)

.PHONY: build run stop clean
