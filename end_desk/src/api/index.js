//把其余四个模块引入
import * as trademark from "./product/trademark";
import * as attr from "./product/attr";
import * as spu from "./product/spu";
import sku from "./product/sku";
import * as user from './acl/user';
import role from './acl/role';
import permission from "./acl/permission";
export default {
  trademark,
  attr,
  spu,
  sku,
  user,
  role,
  permission
};
