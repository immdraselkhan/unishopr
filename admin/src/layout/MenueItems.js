import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { Scope } from "../services/scopeService";

const { SubMenu } = Menu;

const MenuItems = ({ darkMode, toggleCollapsed, topMenu }) => {
    const { path } = useRouteMatch();
    const pathName = window.location.pathname;
    const pathArray = pathName.split(path);
    const mainPath = pathArray[1];
    const mainPathSplit = mainPath.split('/');

    return (
        <Menu
            mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
            theme={darkMode && 'dark'}
            // // eslint-disable-next-line no-nested-ternary
            defaultSelectedKeys={
                !topMenu
                    ? [
                        `${mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
                        }`,
                    ]
                    : []
            }
            defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
            overflowedIndicator={<FeatherIcon icon="more-vertical" />}
        >
            <Menu.Item icon={!topMenu && <FeatherIcon icon="home" />} key="dashboard">
                <NavLink to={`${path}/dashboard`}>
                    Dashboard
                </NavLink>
            </Menu.Item>
            <SubMenu key="user-management" icon={!topMenu && <FeatherIcon icon="user-check" />} title="User Management">
                {Scope.checkScopes(['um_departments_index']) && (
                    <Menu.Item key="departments">
                        <NavLink onClick={toggleCollapsed} to={`${path}/user-management/departments`}>
                            Departments
                        </NavLink>
                    </Menu.Item>
                )}
                {Scope.checkScopes(['um_teams_index']) && (
                    <Menu.Item key="teams">
                        <NavLink onClick={toggleCollapsed} to={`${path}/user-management/teams`}>
                            Teams
                        </NavLink>
                    </Menu.Item>
                )}
                {Scope.checkScopes(['um_roles_index']) && (
                    <Menu.Item key="roles">
                        <NavLink onClick={toggleCollapsed} to={`${path}/user-management/roles`}>
                            Roles
                        </NavLink>
                    </Menu.Item>
                )}
                {Scope.checkScopes(['um_roles_permissions_index']) && (
                    <Menu.Item key="roles-permissions">
                        <NavLink onClick={toggleCollapsed} to={`${path}/user-management/roles-permissions`}>
                            Permissions
                        </NavLink>
                    </Menu.Item>
                )}
                {Scope.checkScopes(['um_users_index']) && (
                    <Menu.Item key="um-users">
                        <NavLink onClick={toggleCollapsed} to={`${path}/user-management/users`}>
                            Users
                        </NavLink>
                    </Menu.Item>
                )}
            </SubMenu>
            <SubMenu key="web-setup" icon={!topMenu && <FeatherIcon icon="settings" />} title="Web Setup">
                {Scope.checkScopes(['ws_categories_index']) && (
                    <Menu.Item key="categories">
                        <NavLink onClick={toggleCollapsed} to={`${path}/web-setup/categories`}>
                            Categories
                        </NavLink>
                    </Menu.Item>
                )}
                {Scope.checkScopes(['ws_sub_categories_index']) && (
                    <Menu.Item key="sub-categories">
                        <NavLink onClick={toggleCollapsed} to={`${path}/web-setup/sub-categories`}>
                            Sub Categories
                        </NavLink>
                    </Menu.Item>
                )}
                {Scope.checkScopes(['ws_child_categories_index']) && (
                    <Menu.Item key="child-categories">
                        <NavLink onClick={toggleCollapsed} to={`${path}/web-setup/child-categories`}>
                            Child Categories
                        </NavLink>
                    </Menu.Item>
                )}
                {Scope.checkScopes(['ws_countries_index']) && (
                    <Menu.Item key="countries">
                        <NavLink onClick={toggleCollapsed} to={`${path}/web-setup/countries`}>
                            Countries
                        </NavLink>
                    </Menu.Item>
                )}
                {Scope.checkScopes(['ws_cities_index']) && (
                    <Menu.Item key="cities">
                        <NavLink onClick={toggleCollapsed} to={`${path}/web-setup/cities`}>
                            Cities
                        </NavLink>
                    </Menu.Item>
                )}
                {Scope.checkScopes(['ws_locations_index']) && (
                    <Menu.Item key="locations">
                        <NavLink onClick={toggleCollapsed} to={`${path}/web-setup/locations`}>
                            Locations
                        </NavLink>
                    </Menu.Item>
                )}
                {Scope.checkScopes(['ws_tags_index']) && (
                    <Menu.Item key="tags">
                        <NavLink onClick={toggleCollapsed} to={`${path}/web-setup/tags`}>
                            Tags
                        </NavLink>
                    </Menu.Item>
                )}
                {Scope.checkScopes(['ws_brands_index']) && (
                    <Menu.Item key="brands">
                        <NavLink onClick={toggleCollapsed} to={`${path}/web-setup/brands`}>
                            Brands
                        </NavLink>
                    </Menu.Item>
                )}
                {Scope.checkScopes(['ws_lead_attributes_index']) && (
                    <Menu.Item key="leadAttributes">
                        <NavLink onClick={toggleCollapsed} to={`${path}/web-setup/lead-attributes`}>
                            Lead Attributes
                        </NavLink>
                    </Menu.Item>
                )}
                {Scope.checkScopes(['ws_lead_timelines_index']) && (
                    <Menu.Item key="leadTimelines">
                        <NavLink onClick={toggleCollapsed} to={`${path}/web-setup/lead-timelines`}>
                            Lead Timelines
                        </NavLink>
                    </Menu.Item>
                )}
                {Scope.checkScopes(['ws_banners_index']) && (
                    <Menu.Item key="banners">
                        <NavLink onClick={toggleCollapsed} to={`${path}/web-setup/banners`}>
                            Banners
                        </NavLink>
                    </Menu.Item>
                )}
            </SubMenu>
            <SubMenu key="workspace" icon={!topMenu && <FeatherIcon icon="briefcase" />} title="Workspace">
                {Scope.checkScopes(['workspace_leads_index']) && (
                    <Menu.Item key="leads">
                        <NavLink onClick={toggleCollapsed} to={`${path}/workspace/leads`}>
                            Leads
                        </NavLink>
                    </Menu.Item>
                )}
                {Scope.checkScopes(['workspace_travels_index']) && (
                    <Menu.Item key="travels">
                        <NavLink onClick={toggleCollapsed} to={`${path}/workspace/travels`}>
                            Travels
                        </NavLink>
                    </Menu.Item>
                )}
                {Scope.checkScopes(['workspace_products_index']) && (
                    <Menu.Item key="products">
                        <NavLink onClick={toggleCollapsed} to={`${path}/workspace/products`}>
                            Products
                        </NavLink>
                    </Menu.Item>
                )}
                {Scope.checkScopes(['workspace_payments_index']) && (
                    <Menu.Item key="payments">
                        <NavLink onClick={toggleCollapsed} to={`${path}/workspace/payments`}>
                            Payments
                        </NavLink>
                    </Menu.Item>
                )}
                {Scope.checkScopes(['workspace_orders_index']) && (
                    <Menu.Item key="orders">
                        <NavLink onClick={toggleCollapsed} to={`${path}/workspace/orders`}>
                            Orders
                        </NavLink>
                    </Menu.Item>
                )}
                {Scope.checkScopes(['workspace_coupons_index']) && (
                    <Menu.Item key="coupons">
                        <NavLink onClick={toggleCollapsed} to={`${path}/workspace/coupons`}>
                            Coupons
                        </NavLink>
                    </Menu.Item>
                )}
            </SubMenu>
            <SubMenu key="clients" icon={!topMenu && <FeatherIcon icon="users" />} title="Clients">
                {Scope.checkScopes(['clients_users_index']) && (
                    <Menu.Item key="users">
                        <NavLink onClick={toggleCollapsed} to={`${path}/client/users`}>
                            Users
                        </NavLink>
                    </Menu.Item>
                )}
                {Scope.checkScopes(['clients_travelers_index']) && (
                    <Menu.Item key="travelers">
                        <NavLink onClick={toggleCollapsed} to={`${path}/client/travelers`}>
                            Travelers
                        </NavLink>
                    </Menu.Item>
                )}
                {Scope.checkScopes(['clients_partners_index']) && (
                    <Menu.Item key="partners">
                        <NavLink onClick={toggleCollapsed} to={`${path}/client/partners`}>
                            Partners
                        </NavLink>
                    </Menu.Item>
                )}
            </SubMenu>
        </Menu>
    );
};

MenuItems.propTypes = {
    darkMode: propTypes.bool,
    topMenu: propTypes.bool,
    toggleCollapsed: propTypes.func,
};

export default MenuItems;
