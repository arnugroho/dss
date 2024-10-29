FROM node:20.18.0 as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/
#COPY pnpm-lock.yaml /app/
#COPY .env.prod .env
RUN npm install -g pnpm
RUN pnpm install
#RUN npx update-browserslist-db@latest
#RUN npm install react-scripts@4.0.3 -g
COPY . /app
RUN pnpm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3003
CMD ["nginx", "-g", "daemon off;"]
