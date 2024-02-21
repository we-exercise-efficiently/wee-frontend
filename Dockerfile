# ù ��° �ܰ�: Node �̹����� ����Ͽ� React ���ø����̼� ����
FROM node:latest as build-stage 
WORKDIR /app

# package.json�� package-lock.json ������ ����
COPY package*.json ./

# ������ ��ġ
RUN npm install

# ������ ���ϵ��� ����
COPY . .

# React ���ø����̼� ����
RUN npm run build

# �� ��° �ܰ�: Nginx �̹����� ����Ͽ� React ���ø����̼� ����
FROM nginx:stable-alpine as production-stage

# ù ��° �ܰ迡�� ������ ���� ������ Nginx�� ���� ���丮�� ����
COPY --from=build-stage app/dist /usr/share/nginx/html

# ��Ʈ 80�� �ܺο� ����
EXPOSE 80

# Nginx ����
CMD ["nginx", "-g", "daemon off;"]
