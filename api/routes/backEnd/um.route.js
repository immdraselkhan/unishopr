const express = require("express");
const router = express.Router();
const {isAuthenticated, isScopePermitted} = require("./../../middlewares/auth.middleware");
const {
    addRole, getRoles, deleteRole, getRole, updateRole,
    getUsers, addUser, updateUser, getUser, deleteUser,
    getRolesPermissions, updateRolesPermissions,
    getDepartments, addDepartment, getDepartment, updateDepartment, deleteDepartment,
    getTeam, addTeam, getTeams, updateTeam, deleteTeam
} = require("./../../controllers/backEnd/um.controller");
const {
    getRolesValidation, getRoleValidation, addRoleValidation, updateRoleValidation, deleteRoleValidation,
    getRolesPermissionsValidation, updateRolesPermissionsValidation,
    getUsersValidation, addUserValidation, getUserValidation, updateUserValidation, deleteUserValidation,
    getDepartmentsValidation, addDepartmentValidation, getDepartmentValidation, updateDepartmentValidation, deleteDepartmentValidation,
    getTeamsValidation, addTeamValidation, getTeamValidation, updateTeamValidation, deleteTeamValidation
} = require("../../validations/backEnd/um.validation")

router.get("/roles", isAuthenticated, isScopePermitted('um_roles_index'), getRolesValidation, getRoles);
router.get("/roles/:_id", isAuthenticated, isScopePermitted('um_roles_index'), getRoleValidation, getRole);
router.post("/roles", isAuthenticated, isScopePermitted('um_roles_create'), addRoleValidation, addRole);
router.put("/roles/:_id", isAuthenticated, isScopePermitted('um_roles_update'), updateRoleValidation, updateRole);
router.delete("/roles/:_id", isAuthenticated, isScopePermitted('um_roles_delete'), deleteRoleValidation, deleteRole);

router.get("/roles-permissions/:_id", isAuthenticated, isScopePermitted('um_roles_permissions_index'),getRolesPermissionsValidation, getRolesPermissions);
router.put("/roles-permissions", isAuthenticated, isScopePermitted('um_roles_permissions_index'), updateRolesPermissionsValidation, updateRolesPermissions);

router.get("/users", isAuthenticated, isScopePermitted('um_users_index'), getUsersValidation, getUsers);
router.post("/users", isAuthenticated, isScopePermitted('um_users_create'), addUserValidation, addUser)
router.get("/users/:_id", isAuthenticated, isScopePermitted('um_users_index'), getUserValidation, getUser)
router.put("/users/:_id", isAuthenticated, isScopePermitted('um_users_update'),updateUserValidation, updateUser)
router.delete("/users/:_id", isAuthenticated, isScopePermitted('um_users_delete'), deleteUserValidation, deleteUser)

router.get("/departments", isAuthenticated, isScopePermitted('um_departments_index'), getDepartmentsValidation, getDepartments)
router.post("/departments", isAuthenticated, isScopePermitted('um_departments_create'), addDepartmentValidation, addDepartment)
router.get("/departments/:_id", isAuthenticated, isScopePermitted('um_departments_index'), getDepartmentValidation, getDepartment)
router.put("/departments/:_id", isAuthenticated, isScopePermitted('um_departments_update'), updateDepartmentValidation, updateDepartment)
router.delete("/departments/:_id", isAuthenticated, isScopePermitted('um_departments_delete'), deleteDepartmentValidation, deleteDepartment)

router.get("/teams", isAuthenticated, isScopePermitted('um_teams_index'), getTeamsValidation, getTeams)
router.post("/teams", isAuthenticated, isScopePermitted('um_teams_create'), addTeamValidation, addTeam)
router.get("/teams/:_id", isAuthenticated, isScopePermitted('um_teams_index'), getTeamValidation, getTeam)
router.put("/teams/:_id", isAuthenticated, isScopePermitted('um_teams_update'), updateTeamValidation, updateTeam)
router.delete("/teams/:_id", isAuthenticated, isScopePermitted('um_teams_delete'), deleteTeamValidation, deleteTeam)

module.exports = router;
