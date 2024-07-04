import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Select, Checkbox } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles } from '../../redux/utilities/actionCreator';
import { fetchRolesPermissions, saveRolesPermissions } from '../../redux/userManagement/rolesPermissions/actionCreator';
import {Scope} from "../../services/scopeService";

const RolesPermissions = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const roles = useSelector(state => state.utilities.roles);

    const [state, setState] = useState({
        checked: [],
        permissions: [],
        roleId: '',
    });

    const handleChange = (value) => {
        if (fetchRolesPermissions)
            dispatch(fetchRolesPermissions(value, {state, setState}));
    };

    useEffect(() => {
        if (fetchRoles) {
            dispatch(fetchRoles());
        }
    }, [dispatch]);

    const multipleChange = (checked, permissions, permissionIndex) => {
        let statePermissions = state.permissions;
        let permissionChecked = [];

        statePermissions[permissionIndex].checked = checked;
        statePermissions.forEach((permission) => permissionChecked = [...permissionChecked, ...permission.checked]);
        setState({ ...state, permissions: statePermissions, checked: permissionChecked });
    };

    const setRolesPermissions = (permissions) => {
        if (saveRolesPermissions)
            dispatch(saveRolesPermissions({roleId: state.roleId, permissions}));
    };

    return (
        <>
            <PageHeader ghost title="Roles Permissions" />
            <Main>
                <Row>
                    <Col md={24} sm={24} xs={24}>
                        <Cards headless={true}>
                            <Row>
                                <Col span={12}>
                                    <Form>
                                        <Form.Item
                                            name="role"
                                            initialValue={''}
                                            label="Select Role">
                                            <Select onChange={handleChange} loading={isLoading}>
                                                {roles.map((data) => <Select.Option value={data._id} key={data._id}>{data.name}</Select.Option>)}
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>
                        </Cards>
                        {state.permissions && state.permissions.length > 0 ? (
                            <Cards title={'Permissions'}>
                                {state.permissions.map((data, index) => (
                                    <div key={index}>
                                        {index !== 0 ? <><br/><br/></> : ''}
                                        <div style={{ borderBottom: '1px solid #E9E9E9', marginBottom: '10px'}}>
                                            <Checkbox
                                                indeterminate={data.checked.length && data.checked.length < data.permissions.length}
                                                onChange={(event) => multipleChange((data.permissions.length === data.checked.length ? [] : data.permissions.map((el) => el.value)), data.permissions, index)}
                                                checked={data.checked.length === data.permissions.length}
                                            >
                                                {data.group}
                                            </Checkbox>
                                        </div>

                                        <Checkbox.Group
                                            options={data.permissions}
                                            value={data.checked}
                                            onChange={(event) => multipleChange(event, data.permissions, index)} />
                                    </div>
                                ))}
                                {Scope.checkScopes(['um_roles_permissions_update']) && (
                                    <div className="text-right">
                                        <br/>
                                        <Button
                                            type="primary"
                                            htmlType="button"
                                            onClick={() => setRolesPermissions(state.checked)}
                                            disabled={isLoading}>
                                            {isLoading ? 'Loading...' : 'Submit'}
                                        </Button>
                                    </div>
                                )}
                            </Cards>
                        ) : ''}
                    </Col>
                </Row>
            </Main>
        </>
    );
};

export default RolesPermissions;
