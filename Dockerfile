FROM node

WORKDIR /app

COPY ./damatta_backend/package*.json /app/

RUN npm install 

COPY ./damatta_backend /app/

ENV PORT=${PORT}
ENV ENV=${ENV}
ENV RDS_DB_NAME=${RDS_DB_NAME}
ENV RDS_USERNAME=${RDS_USERNAME}
ENV RDS_PASSWORD=${RDS_PASSWORD}
ENV RDS_HOSTNAME=${RDS_HOSTNAME}
ENV RDS_PORT=${RDS_PORT}
ENV PROD_FRONT_URL=${PROD_FRONT_URL}
ENV JWT_ACCESS_SECRET=${JWT_ACCESS_SECRET}
ENV JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}

RUN npm run build

EXPOSE ${PORT}

CMD ["npm", "start"]