import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const graphqlContext = GqlExecutionContext.create(context);
    const resolverName = graphqlContext.getClass().name;
    const fieldName = graphqlContext.getInfo().fieldName;
    const args = graphqlContext.getArgs();
    const user = graphqlContext.getContext().user;

    console.log('-------------------------------');
    console.log(`🔍 Resolver: ${resolverName}`);
    console.log(`📦 Field: ${fieldName}`);
    console.log(`🧾 Args:`, args);
    console.log(`👤 User:`, user);

    return next.handle()
  }
}
