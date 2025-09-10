campaign API v2 

https://lucid.app/lucidchart/45569a38-0155-4851-97c2-c7138a4a750a/edit?viewport_loc=-1213%2C220%2C1599%2C1176%2C9hnOEo680-Jd&invitationId=inv_e04338bf-5fd5-407a-99e4-48111872ce7a

nest g module modules/auth                   
nest g service modules/auth
nest g controller modules/auth
nest g abstract modules/auth

pnpm install


setup env follow by example .env.example
npx prisma init
npx prisma generate # use every time that change model
docker-compose up -d