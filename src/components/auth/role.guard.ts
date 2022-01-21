import Role from './role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
 
const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const userRole = request.user.role; 
      return userRole?.name.includes(role);
    }
  }
  return mixin(RoleGuardMixin);
}
 
export default RoleGuard;