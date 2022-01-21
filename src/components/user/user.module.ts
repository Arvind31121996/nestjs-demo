import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@components/user/entity/user.entity';
import { Role } from '@components/user/entity/role.entity'
import { UserController } from '@components/user/user.controller';
import { UserService } from '@components/user/user.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailService } from "@components/utils/sendEmail";
import { ScheduleModule } from '@nestjs/schedule';
import { Permission } from '@components/user/entity/permission.entity';
import { RedisCacheModule } from '@components/redis/redis.module';
import { SessionModule } from 'nestjs-session';
import path from 'path';





@Module({
  imports: [RedisCacheModule,
    TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([Role]),TypeOrmModule.forFeature([Permission]),
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        port: process.env.EMAIL_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "a.kumar@wishtreetech.com", // generated ethereal user
          pass: "Techify@123" // generated ethereal password
        },
      },
      defaults: {
        from: '"nest-modules" <a.kumar@wishtechtree.com>', // outgoing email ID
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
    SessionModule.forRoot({
      session: { secret: 'thisismysecret',
      name:'nestjs_session',
      resave:false,
      saveUninitialized:true,
      cookie: { maxAge: 60000,
        sameSite: 'none',
        expires: new Date(new Date().getTime()+5*10*60*1000),
        path:'/'
         },
    },
    }),
],
  providers: [UserService,EmailService],
  exports: [UserService, EmailService],
  controllers: [UserController],
})
export class UserModule {}
