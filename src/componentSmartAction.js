import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Button } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import { cache } from '@ivoyant/component-cache';
import antdRobot from './assets/antdRobot.svg';
import shortid from 'shortid';

const FooterButton = (props) => {
    const {
        text = '',
        hyperlink = 'closeActions',
        modalCloseFunction,
        index,
        optionsLength,
    } = props;
    let style;
    if (hyperlink !== 'closeActions') {
        if (index === 0) {
            style = { color: 'white', backgroundColor: '#52c41a' };
        }
        if (index > 0 && index < optionsLength) {
            style = {
                color: '#52c41a',
                backgroundColor: '#f6ffed',
                borderColor: '#52c41a',
            };
        }
    }
    let onClickFunction;
    if (hyperlink === 'closeActions') {
        onClickFunction = modalCloseFunction;
    } else {
        onClickFunction = () => {
            cache.put('smartAction', { smartActionFiredOnce: true });
            window[sessionStorage?.tabId]?.navigateRoute(hyperlink);
            modalCloseFunction();
        };
    }
    return (
        <Button key={text} onClick={onClickFunction} style={style}>
            {text}
        </Button>
    );
};

const getFooter = (options, modalCloseFunction) => {
    return (
        <>
            {options &&
                options?.map((option, index) => {
                    return (
                        <FooterButton
                            text={option?.text}
                            hyperlink={option?.hyperlink}
                            modalCloseFunction={modalCloseFunction}
                            index={shortid.generate()}
                            optionsLength={options?.length}
                        />
                    );
                })}
        </>
    );
};

export default function componentSmartAction(props) {
    const location = useLocation();
    const history = useHistory();
    const { component, children, data, datasources } = props;
    const { params } = component;
    const {
        modalClassName = '',
        maskClosable = false,
        closable = false,
    } = params;
    const recommendations = data?.data?.recommendations?.recommendations;
    const [modalVisible, setModalVisible] = useState(
        recommendations?.length > 0 &&
            cache.get('smartAction')?.smartActionFiredOnce !== true
    );

    const handleClose = () => {
        cache.put('smartAction', { smartActionFiredOnce: true });
        setModalVisible(false);
    };

    return (
        <>
            {recommendations?.length > 0 && (
                <div className={modalClassName}>
                    <Modal
                        title={
                            <div>
                                <img src={antdRobot} />
                                &nbsp;Did you know?
                            </div>
                        }
                        open={modalVisible}
                        onCancel={handleClose}
                        maskClosable={maskClosable}
                        className={modalClassName}
                        footer={getFooter(
                            recommendations?.[0]?.options,
                            handleClose
                        )}
                        centered
                        closable={closable}
                        forceRender
                    >
                        <div
                            className="smartActionModalActionName"
                            style={{ color: '#52c41a' }}
                        >
                            {recommendations?.[0]?.actionName}
                        </div>
                        <br />
                        <div className="smartActionModalMessage">
                            {recommendations?.[0]?.message}
                        </div>
                    </Modal>
                </div>
            )}
        </>
    );
}
