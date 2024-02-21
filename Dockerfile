# 첫 번째 단계: Node 이미지를 사용하여 React 애플리케이션 빌드
FROM node:latest as build-stage 
WORKDIR /app

# package.json과 package-lock.json 파일을 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 나머지 파일들을 복사
COPY . .

# React 애플리케이션 빌드
RUN npm run build

# 두 번째 단계: Nginx 이미지를 사용하여 React 애플리케이션 제공
FROM nginx:stable-alpine as production-stage

# 첫 번째 단계에서 빌드한 정적 파일을 Nginx의 서빙 디렉토리로 복사
COPY --from=build-stage app/dist /usr/share/nginx/html

# 포트 80을 외부에 노출
EXPOSE 80

# Nginx 시작
CMD ["nginx", "-g", "daemon off;"]
