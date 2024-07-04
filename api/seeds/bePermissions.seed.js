const { PermissionModel } = require("../models/bePermission.model");

setTimeout(async () => {
    const arr = [
        { name: 'dashboard_index', displayName: 'Dashboard View', group: 'Dashboard' },

        { name: 'um_departments_index', displayName: 'Departments View', group: 'User Management - Departments' },
        { name: 'um_departments_create', displayName: 'Departments Create', group: 'User Management - Departments' },
        { name: 'um_departments_update', displayName: 'Departments Update', group: 'User Management - Departments' },
        { name: 'um_departments_delete', displayName: 'Departments Delete', group: 'User Management - Departments' },

        { name: 'um_teams_index', displayName: 'Teams View', group: 'User Management - Teams' },
        { name: 'um_teams_create', displayName: 'Teams Create', group: 'User Management - Teams' },
        { name: 'um_teams_update', displayName: 'Teams Update', group: 'User Management - Teams' },
        { name: 'um_teams_delete', displayName: 'Teams Delete', group: 'User Management - Teams' },

        { name: 'um_roles_index', displayName: 'Roles View', group: 'User Management - Roles' },
        { name: 'um_roles_create', displayName: 'Roles Create', group: 'User Management - Roles' },
        { name: 'um_roles_update', displayName: 'Roles Update', group: 'User Management - Roles' },
        { name: 'um_roles_delete', displayName: 'Roles Delete', group: 'User Management - Roles' },

        { name: 'um_roles_permissions_index', displayName: 'Roles Permissions View', group: 'User Management - Roles Permissions' },
        { name: 'um_roles_permissions_update', displayName: 'Roles Permissions Update', group: 'User Management - Roles Permissions' },

        { name: 'um_users_index', displayName: 'Users View', group: 'User Management - Users' },
        { name: 'um_users_create', displayName: 'Users Create', group: 'User Management - Users' },
        { name: 'um_users_update', displayName: 'Users Update', group: 'User Management - Users' },
        { name: 'um_users_delete', displayName: 'Users Delete', group: 'User Management - Users' },

        { name: 'ws_categories_index', displayName: 'Categories View', group: 'Web Setup - Categories' },
        { name: 'ws_categories_create', displayName: 'Categories Create', group: 'Web Setup - Categories' },
        { name: 'ws_categories_update', displayName: 'Categories Update', group: 'Web Setup - Categories' },
        { name: 'ws_categories_delete', displayName: 'Categories Delete', group: 'Web Setup - Categories' },

        { name: 'ws_sub_categories_index', displayName: 'Sub Categories View', group: 'Web Setup - Sub Categories' },
        { name: 'ws_sub_categories_create', displayName: 'Sub Categories Create', group: 'Web Setup - Sub Categories' },
        { name: 'ws_sub_categories_update', displayName: 'Sub Categories Update', group: 'Web Setup - Sub Categories' },
        { name: 'ws_sub_categories_delete', displayName: 'Sub Categories Delete', group: 'Web Setup - Sub Categories' },

        { name: 'ws_child_categories_index', displayName: 'Child Categories View', group: 'Web Setup - Child Categories' },
        { name: 'ws_child_categories_create', displayName: 'Child Categories Create', group: 'Web Setup - Child Categories' },
        { name: 'ws_child_categories_update', displayName: 'Child Categories Update', group: 'Web Setup - Child Categories' },
        { name: 'ws_child_categories_delete', displayName: 'Child Categories Delete', group: 'Web Setup - Child Categories' },

        { name: 'ws_countries_index', displayName: 'Countries View', group: 'Web Setup - Countries' },
        { name: 'ws_countries_create', displayName: 'Countries Create', group: 'Web Setup - Countries' },
        { name: 'ws_countries_update', displayName: 'Countries Update', group: 'Web Setup - Countries' },
        { name: 'ws_countries_delete', displayName: 'Countries Delete', group: 'Web Setup - Countries' },

        { name: 'ws_cities_index', displayName: 'Cities View', group: 'Web Setup - Cities' },
        { name: 'ws_cities_create', displayName: 'Cities Create', group: 'Web Setup - Cities' },
        { name: 'ws_cities_update', displayName: 'Cities Update', group: 'Web Setup - Cities' },
        { name: 'ws_cities_delete', displayName: 'Cities Delete', group: 'Web Setup - Cities' },

        { name: 'ws_locations_index', displayName: 'Locations View', group: 'Web Setup - Locations' },
        { name: 'ws_locations_create', displayName: 'Locations Create', group: 'Web Setup - Locations' },
        { name: 'ws_locations_update', displayName: 'Locations Update', group: 'Web Setup - Locations' },
        { name: 'ws_locations_delete', displayName: 'Locations Delete', group: 'Web Setup - Locations' },

        { name: 'ws_tags_index', displayName: 'Tags View', group: 'Web Setup - Tags' },
        { name: 'ws_tags_create', displayName: 'Tags Create', group: 'Web Setup - Tags' },
        { name: 'ws_tags_update', displayName: 'Tags Update', group: 'Web Setup - Tags' },
        { name: 'ws_tags_delete', displayName: 'Tags Delete', group: 'Web Setup - Tags' },

        { name: 'ws_banners_index', displayName: 'Banners View', group: 'Web Setup - Banners' },
        { name: 'ws_banners_create', displayName: 'Banners Create', group: 'Web Setup - Banners' },
        { name: 'ws_banners_update', displayName: 'Banners Update', group: 'Web Setup - Banners' },
        { name: 'ws_banners_delete', displayName: 'Banners Delete', group: 'Web Setup - Banners' },

        { name: 'ws_brands_index', displayName: 'Brands View', group: 'Web Setup - Brands' },
        { name: 'ws_brands_create', displayName: 'Brands Create', group: 'Web Setup - Brands' },
        { name: 'ws_brands_update', displayName: 'Brands Update', group: 'Web Setup - Brands' },
        { name: 'ws_brands_delete', displayName: 'Brands Delete', group: 'Web Setup - Brands' },

        { name: 'ws_lead_attributes_index', displayName: 'Lead Attributes View', group: 'Web Setup - Lead Attributes' },
        { name: 'ws_lead_attributes_create', displayName: 'Lead Attributes Create', group: 'Web Setup - Lead Attributes' },
        { name: 'ws_lead_attributes_update', displayName: 'Lead Attributes Update', group: 'Web Setup - Lead Attributes' },
        { name: 'ws_lead_attributes_delete', displayName: 'Lead Attributes Delete', group: 'Web Setup - Lead Attributes' },

        { name: 'ws_lead_timelines_index', displayName: 'Lead Timelines View', group: 'Web Setup - Lead Timelines' },
        { name: 'ws_lead_timelines_create', displayName: 'Lead Timelines Create', group: 'Web Setup - Lead Timelines' },
        { name: 'ws_lead_timelines_update', displayName: 'Lead Timelines Update', group: 'Web Setup - Lead Timelines' },
        { name: 'ws_lead_timelines_delete', displayName: 'Lead Timelines Delete', group: 'Web Setup - Lead Timelines' },

        { name: 'workspace_leads_index', displayName: 'Leads View', group: 'Workspace - Leads' },
        { name: 'workspace_leads_create', displayName: 'Leads Create', group: 'Workspace - Leads' },
        { name: 'workspace_leads_update', displayName: 'Leads Update', group: 'Workspace - Leads' },
        { name: 'workspace_leads_delete', displayName: 'Leads Delete', group: 'Workspace - Leads' },
        { name: 'workspace_leads_super_update', displayName: 'Leads Super Update', group: 'Workspace - Leads' },

        { name: 'workspace_travels_index', displayName: 'Travels View', group: 'Workspace - Travels' },
        { name: 'workspace_travels_create', displayName: 'Travels Create', group: 'Workspace - Travels' },
        { name: 'workspace_travels_update', displayName: 'Travels Update', group: 'Workspace - Travels' },
        { name: 'workspace_travels_delete', displayName: 'Travels Delete', group: 'Workspace - Travels' },

        { name: 'workspace_products_index', displayName: 'Products View', group: 'Workspace - Products' },
        { name: 'workspace_products_create', displayName: 'Products Create', group: 'Workspace - Products' },
        { name: 'workspace_products_update', displayName: 'Products Update', group: 'Workspace - Products' },
        { name: 'workspace_products_delete', displayName: 'Products Delete', group: 'Workspace - Products' },

        { name: 'workspace_coupons_index', displayName: 'Coupons View', group: 'Workspace - Coupons' },
        { name: 'workspace_coupons_create', displayName: 'Coupons Create', group: 'Workspace - Coupons' },
        { name: 'workspace_coupons_update', displayName: 'Coupons Update', group: 'Workspace - Coupons' },
        { name: 'workspace_coupons_delete', displayName: 'Coupons Delete', group: 'Workspace - Coupons' },

        { name: 'workspace_orders_index', displayName: 'Orders View', group: 'Workspace - Orders' },
        { name: 'workspace_orders_create', displayName: 'Orders Create', group: 'Workspace - Orders' },
        { name: 'workspace_orders_update', displayName: 'Orders Update', group: 'Workspace - Orders' },
        { name: 'workspace_orders_delete', displayName: 'Orders Delete', group: 'Workspace - Orders' },

        { name: 'workspace_payments_index', displayName: 'Payments View', group: 'Workspace - Payments' },
        { name: 'workspace_payments_create', displayName: 'Payments Create', group: 'Workspace - Payments' },
        { name: 'workspace_payments_update', displayName: 'Payments Update', group: 'Workspace - Payments' },
        { name: 'workspace_payments_delete', displayName: 'Payments Delete', group: 'Workspace - Payments' },

        { name: 'clients_users_index', displayName: 'Users View', group: 'Clients - Users' },
        { name: 'clients_users_create', displayName: 'Users Create', group: 'Clients - Users' },
        { name: 'clients_users_update', displayName: 'Users Update', group: 'Clients - Users' },
        { name: 'clients_users_delete', displayName: 'Users Delete', group: 'Clients - Users' },

        { name: 'clients_travelers_index', displayName: 'Travelers View', group: 'Clients - Travelers' },
        { name: 'clients_travelers_create', displayName: 'Travelers Create', group: 'Clients - Travelers' },
        { name: 'clients_travelers_update', displayName: 'Travelers Update', group: 'Clients - Travelers' },
        { name: 'clients_travelers_delete', displayName: 'Travelers Delete', group: 'Clients - Travelers' },

        { name: 'clients_partners_index', displayName: 'Partners View', group: 'Clients - Partners' },
        { name: 'clients_partners_create', displayName: 'Partners Create', group: 'Clients - Partners' },
        { name: 'clients_partners_update', displayName: 'Partners Update', group: 'Clients - Partners' },
        { name: 'clients_partners_delete', displayName: 'Partners Delete', group: 'Clients - Partners' },
    ];

    await PermissionModel.deleteMany({});
    await PermissionModel.insertMany(arr, (error, docs) => {
        if (error)
            console.log(error)
    });
}, 1100);
