import Styled from 'styled-components';

const Main = Styled.div`
    padding: 0px 30px 20px;
    min-height: 715px;
    background-color: rgb(244, 245, 247);
    .ant-card-rtl .ant-card-extra{
                margin-right: 0 !important;
            }
    .ant-tabs-tab span svg {        
        ${({ theme }) => (theme.rtl ? 'padding-left' : 'padding-right')}: 5px;
    }
    /* Picker Under Input */
    .ant-form-item-control-input .ant-picker {
        padding: ${({ theme }) => (theme.rtl ? '0 0 0 12px' : '0 12px 0 0')} !important;
    }

    /* progressbars */

    .ant-progress {
        display: inline-flex !important;
        align-items: center;
    }

    .ant-progress>div {
        display: flex;
        flex-direction: column;
    }

    .ant-progress .ant-progress-outer {
        ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 0 !important;
        ${({ theme }) => (!theme.rtl ? 'padding-right' : 'padding-left')}: 0 !important;
    }

    .ant-progress .ant-progress-text {
        order: 0;
        margin-left: auto;
        ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 10px !important;
        align-self: flex-end;
        text-align: center;
    }

    .ant-progress-status-warning .ant-progress-bg {
        background: #fa8b0c;
    }

    /* progress bars */
    
    @media only screen and (max-width: 1199px){
        padding: 0px 15px;
    }
    @media only screen and (max-width: 991px){
        min-height: 580px;
    }
    .w-100{
        width: 100%;
    }
    .product-sidebar-col{
        @media only screen and (max-width: 767px){
            order: 2;
        }
    }
    .ant-skeleton-paragraph{
        margin-bottom: 0;
    }

    /* // ant alert */
    .ant-alert-closable{
        .ant-alert-message{
          ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 15px;
        }
    }

    .ant-alert-with-description .ant-alert-description{
        display: inline-block;
    }

    /* // ant Calendar Picker */
    .ant-picker-calendar{
        .ant-badge-status-text{
            color: ${({ theme }) => theme['gray-color']}
        }
    }
    .ant-picker-calendar-header .ant-picker-calendar-year-select{
        @media only screen and (max-width: 400px){
            width: 50% !important;
        }
    }
    .ant-picker-calendar-header .ant-picker-calendar-month-select{
        @media only screen and (max-width: 400px){
            width: calc(50% - 8px) !important
        }
    }

    /* // Card Grid */
    .card-grid-wrap{
        .ant-card-grid{
            @media only screen and (max-width: 575px){
                width: 50% !important
            }
        }
    }

    /* // Drawer */
    .atbd-drawer{
        .ant-card-body{
            text-align: center;
        }
    }
    .drawer-placement{
        @media only screen and (max-width: 400px){
            text-align: center;
        }
        .ant-radio-group{
            @media only screen and (max-width: 400px){
                margin-bottom: 15px;
            }
        }
    }
    .ant-drawer-content-wrapper{
        @media only screen and (max-width: 400px){
            width: 260px !important;
        }
        @media only screen and (max-width: 375px){
            width: 220px !important;
        }
    }

    /* // Input */
    .input-wrap{
        @media only screen and (max-width: 991px){
            min-height: 500px;
        }
        input::placeholder{
            color: ${({ theme }) => theme['light-color']};
        }
    }
    /* // Modal Buttons */
    .modal-btns-wrap{
        margin: 0 -5px;
    }
    /* spinner */
    .ant-spin{
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 20px;
        &:last-child{
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 0;
        }
    }

    /* Column Cards Wrapper */
    .columnCardsWrapper{
        background: #F4F5F7;
        border-radius: 4px;
        padding: 50px 30px 25px;
    }
    .columnCardsWrapper .ant-card{
        background: #fff;
    }
    .columnCardsWrapper .ant-card-head{
        background: #fff;
    }

    /* Ant Collapse */
    .ant-collapse{
        border-color: #E3E6EF;
        border-radius: 5px;
    }
    .ant-collapse.ant-collapse-icon-position-left .ant-collapse-header{
        color: #5A5F7D;
        padding: 12px 16px 10px 45px;
        background-color: ${({ theme }) => theme['bg-color-light']};
    }
    .ant-collapse-content p{
        color: #9299B8;
        margin-bottom: 0;
    }
    .ant-collapse-content > .ant-collapse-content-box {
        padding: 20px 20px 12px;
    }
    .ant-collapse-content > .ant-collapse-content-box .ant-collapse-content-box{
        padding: 10.5px 20px;
    }
    .ant-collapse.ant-collapse-borderless{
        background-color: #fff;
    }
    .ant-collapse > .ant-collapse-item,
    .ant-collapse .ant-collapse-content{
        border-color: #E3E6EF;
    }
    .ant-collapse > .ant-collapse-item.ant-collapse-item-disabled .ant-collapse-header{
        color: #ADB4D2 !important;
    }

    .ant-collapse > .ant-collapse-item .ant-collapse-header .ant-collapse-arrow{

        font-size: 8px;
    }

    .ant-collapse .ant-collapse {
        border: 0 none;
        background: #fff;
    }

    .ant-collapse .ant-collapse > .ant-collapse-item {
        border-bottom: 0;
    }
    .ant-collapse .ant-collapse .ant-collapse-header{
        border: 1px solid #E3E6EF;
        background: #F8F9FB;
    }
    .ant-collapse .ant-collapse .ant-collapse-content{
        margin: 20px 0 10px 0;
        border: 1px solid #E3E6EF;
        border-radius: 0;
    }

    /* // Ant Radio */
    .ant-radio-button-wrapper{
        height: 48px;
        line-height: 46px;
        padding: 0 25.25px;
        @media only screen and (max-width: 1024px){
            padding: 0 10px;
        }
        @media only screen and (max-width: 379px){
            height: 40px !important;
            line-height: 38px !important;
            font-size: 12px;
            padding: 0 6px;
        }
    }

    /* // Select */
    .ant-tree-select .ant-select-selector{
        height: 42px;
    }
    .tag-select-list{
        margin-bottom: -10px;
        .ant-select{
            margin-bottom: 10px;
        }
    }
    .ant-select-selector{
        border-color: #E3E6EF !important;
    }

    .ant-select{
        &.ant-select-multiple{
            .ant-select-selection-item{
                ${({ theme }) => (!theme.rtl ? 'padding-left' : 'padding-right')}: 8px;
            }
        }
        .ant-select-selection-item{
            ${({ theme }) => (!theme.rtl ? 'padding-left' : 'padding-right')}: 10px !important;
        }
        &.ant-select-lg{
            height: 50px;
            line-height: 48px;
            .ant-select-selector{
                height: 50px !important;
                line-height: 48px;
            }
            .ant-select-selection-item{
                line-height: 48px !important;
                ${({ theme }) => (!theme.rtl ? 'padding-left' : 'padding-right')}: 8px;
            }
            &.ant-select-multiple.ant-select-lg .ant-select-selection-item{
                height: 32px;
                line-height: 32px !important;
            }
        }
        &.ant-select-multiple.ant-select-sm{
            .ant-select-selection-item{
                height: 16px;
                line-height: 14px;
                font-size: 11px;
            }
        }
    }

    /* // Slider */
    .slider-with-input{
        .ant-slider{
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 15px;
        }
        .slider-with-input__single{
            margin-bottom: 15px;
        }
    }

    /* // Taglist */
    .taglist-wrap{
        margin: -5px;
        .ant-tag {
            line-height: 22px;
            padding: 0 10.2px;
            border: 0 none;
            margin: 5px;
            color: ${({ theme }) => theme['gray-color']};
            &.ant-tag-has-color{
                color: #fff !important;
            }
            &.ant-tag-magenta{
                color: #eb2f96;
            }
            &.ant-tag-red{
                color: #f5222d;
            }
            &.ant-tag-volcano{
                color: #fa541c;
            }
            &.ant-tag-orange{
                color: #fa8c16;
            }
            &.ant-tag-gold{
                color: #faad14;
            }
            &.ant-tag-line{
                color: #a0d911;
            }
            &.ant-tag-green{
                color: #a0d911;
            }
            &.ant-tag-cyan{
                color: #13c2c2;
            }
            &.ant-tag-blue{
                color: #1890ff;
            }
            &.ant-tag-geekbule{
                color: #2f54eb;
            }
            &.ant-tag-purple{
                color: #722ed1;
            }
        }
    }

    /* // Timepicker List */
    .timepicker-list{
        margin: -5px;
        .ant-picker{
            margin: 5px;
        }
    }

    /* // Ant Menu */
    .ant-menu{
        .ant-menu-submenu-title{
            svg{
                color: ${({ theme }) => theme['light-color']};
            }
        }
    }

    /* Ant Comment */
    .ant-comment-inner{
        padding: 0;
    }
    .ant-comment-content-detail p{
        color: #9299B8;
    }
    .ant-list-items{
        padding-top: 22px;
    }
    .ant-list-items li:not(:last-child){
        margin-bottom: 22px;
    }
    .ant-comment:not(:last-child){
        margin-bottom: 22px;
    }
    .ant-comment-nested{
        margin-top: 22px;
    }
    .ant-comment-actions li span{
        color: #ADB4D2;
    }
    .ant-comment-content-detail textarea{
        resize: none;
        min-height: 170px;
        border-radius: 5px;
    }

    /* // Vector Map */
    .vertor-map{
        min-height: 505px;
        .world-map{
            width: 100%;
            height: 600px;
            @media only screen and (max-width: 575px){
                height: 400px;
            }
            @media only screen and (max-width: 375px){
                height: 350px;
            }
        }
    }

    /* // Checkout Wrapper */
    .checkoutWraper{
        .ant-card-body{
            padding: 50px 50px 50px 30px !important;
            @media only screen and (max-width: 575px){
                padding: 25px !important;
            }
            .ant-card-body{
                padding: 25px !important;
                @media only screen and (max-width: 375px){
                    padding: 15px !important;
                }
            }
        }
        .ant-steps{
            margin-top: -22px;
        }
    }

    /* // Star Active */
    a{
        i,
        span.fa{
          font-size: 16px;
          color: ${({ theme }) => theme['extra-light-color']};
        }
        &.starDeactivate{
          i:before{
            content: "\f31b";
          }
        }
        &.starActive{
          i,
          span.fa{
            color: ${({ theme }) => theme['warning-color']};
          }
          i:before,
          span.fa:before{
            color: ${({ theme }) => theme['warning-color']};
            content: "\f005";
    
          }
        }
    }

    .ant-timeline{
        color: ${({ theme }) => theme['gray-color']};
        .ant-timeline-item-content{
            font-size: 16px;
        }
    }

    
    .ant-rate-content{
        font-weight: 500;
        color: ${({ theme }) => theme['gray-color']}
    }

    .account-card{
        .ant-card-head{
            .ant-card-extra{
                @media only screen and (max-width: 575px){
                   padding-top: 0 !important;
                }
            }
            
        }
                
    }

    /* // Rechart */
    .recharts-default-legend{
        .recharts-legend-item{
            min-width: 100px !important;
        }
    }

    /* // Radio */
    .radio-size-wrap{
            .ant-radio-button-wrapper{
                @media only screen and (max-width: 1450px){
                    padding: 0 11.5px;
                }
            }
        }
    }

    /* // Message  */
    .message-button-list{
        margin: -4px;
        .ant-btn {
            margin: 4px;
        }
    }
    /* Chart Label */

    .chart-label {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 6px;
        color: #5a5f7d;
    }

    .chart-label .label-dot {
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 8px;
        width: 7px;
        height: 7px;
        border-radius: 50%;
    }

    .chart-label .label-dot.dot-success {
        background: #20c997;
    }

    .chart-label .label-dot.dot-info {
        background: #5f63f2;
    }

    .chart-label .label-dot.dot-warning {
        background: #fa8b0c;
    }

    .chart-label .label-dot {
        display: block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 10px;
    }

    // Ant comment action
    .ant-comment-actions{
        li{
            position: relative;
            &:not(:last-child){
                margin-right: 8px;
                padding-right: 8px;
                &:after{
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 1px;
                    height: 12px;
                    background-color: #C6D0DC;
                    content: '';
                }
            }
            .com-time{
                cursor: default;
            }
            span{
                margin-right: 0;
            }
        }
    }

    // Emoji Picker React
    .emoji-picker-react{
        top: 15px;
        right: 25px;
        box-shadow: 0 5px 10px #efefef10;
        @media only screen and (max-width: 479px){
            top: 25px;
            right: -50px;
            width: 260px;
        }
        .emoji-categories{
            padding: 0 10px;
        }
        .emoji-search{
            margin: 0 10px;
        }
        .content-wrapper:before{
            display: none;
        }
        .emoji-group{
            padding: 0 10px;
        }
        .emoji-group:before{
            font-size: 12px;
            font-weight: 600;
            color: ${({ theme }) => theme['dark-color']};
        }
        .emoji-group .emoji-img{
            margin: 5px !important;
        }
    }
`;

const ButtonsGroupWrapper = Styled.div`
    margin-bottom: -25px;
    .button-group-single{
        margin-bottom: 15px;
        h4{
            font-size: 15px;
            margin-bottom: 8px;
        }
        .ant-btn-group{
            margin-bottom: 10px;
        }
    }
    .button-group-single .ant-btn-white{
        border: 1px solid #E3E6EF;
        background: #fff !important;
        ${({ theme }) => (theme.rtl ? 'border-left-width' : 'border-right-width')}: 0px;
        &:last-child{
            ${({ theme }) => (theme.rtl ? 'border-left-width' : 'border-right-width')}: 1px;
        }
        &:hover{
            color: ${({ theme }) => theme['gray-color']} !important;
            background: ${({ theme }) => theme['bg-color-normal']} !important;
        }
    }
    .button-group-single .ant-btn-light{
        border: 1px solid #E3E6EF;
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 20px;
        ${({ theme }) => (theme.rtl ? 'border-left-width' : 'border-right-width')}: 0px;
        font-weight: 500;
        color: ${({ theme }) => theme['extra-light-color']} !important;
        background: ${({ theme }) => theme['bg-color-normal']} !important;
        &:last-child{
            ${({ theme }) => (theme.rtl ? 'border-left-width' : 'border-right-width')}: 1px;
        }
    }
    .ant-btn-group:not(:last-child){
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 20px;
    }
`;

const BlockButtonsWrapper = Styled.div`
    .ant-btn-block{
        margin-bottom: 10px;
    }
`;

const ButtonSizeWrapper = Styled.div`
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
`;

const BtnWithIcon = Styled.div`
    display: inline;
    .anticon i,
    .anticon svg,
    .anticon img{
        width: 10px;
        height: 10px;
    }
    .ant-btn-group button.active{
        ${({ theme }) => (theme.rtl ? 'border-left' : 'border-right')}: 0px;
    }
`;

const AlertList = Styled.div`
    margin-top: -15px;
    .alert-empty-message{
        .ant-alert{
            padding: 10px 40px 10px!important;
            &.ant-alert-no-icon{
                padding: 10px 20px 10px!important;
            }
        }
        .ant-alert-icon{
            top: 15px !important;
        }
        .ant-alert-message{
            display: none !important;
        }
    }
`;

const AutoCompleteWrapper = Styled.div`
    .ant-select:not(:last-child){
        margin-bottom: 20px;
    }
    .auto-complete-input{
        .ant-select{
            width: 200px !important;
            @media only screen and (max-width: 575px){
                width: 100% !important;
            }
        }
    }
`;

const CalendarWrapper = Styled.div`
    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector{
        height: 30px !important;
    }
    .ant-select-single .ant-select-selector .ant-select-selection-item,
    .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
        line-height: 28px !important;
    }
    .ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date-content{
        height: 105px;
    }
    .ant-radio-button-wrapper{
        height: 30px;
        line-height: 28px;
        @media only screen and (max-width: 575px){
            height: 30px !important;
            line-height: 28px !important;
        }
    }
`;

const DatePickerWrapper = Styled.div`
    .ant-picker{
        padding: 6px 11px 6px;
        width: 100%;
        border-color: #E3E6EF;
        border-radius: 5px;
    }
    .ant-picker:not(:last-child){
        margin-bottom: 20px;
    }
    .ant-picker-input > input{
        color: #5A5F7D;
    }
    .ant-picker-range .ant-picker-input > input{
        text-align: center;
        font-weight: 500;
    }
`;

const NotificationListWrapper = Styled.div`
    margin: -4px;
    button{
        margin: 4px;
    }
`;

const TagInput = Styled.div`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme['border-color-normal']};
    margin: -3px;
    .ant-tag{
        margin: 3px;
        font-size: 11px;
        padding: 0 4px;
        border: 0 none;
        height: 24px;
        display: inline-flex;
        align-items: center;
    }
`;

const PageHeaderWrapper = Styled.div`
    .ant-page-header{
        border: 1px solid ${({ theme }) => theme['border-color-normal']};
        border-radius: 5px;
    }
    .ant-page-header .ant-page-header-heading-left{
        margin: 2px 0;
    }
`;

const MessageStyleWrapper = Styled.div`
    .ant-btn-lg{
        font-size: 14px;
    }
`;

const BasicFormWrapper = Styled.div`
    .ant-form-item{
        flex-flow: column;
        &:not(:last-child){
            margin-bottom: 26px;
        }
        &:last-child{
            margin-bottom: 0;
        }
        .ant-form-item-label{
            text-align: ${({ theme }) => (theme.rtl ? 'right' : 'left')};
            label{
                height: fit-content;
                margin-bottom: 6px;
            }
        }
        .ant-form-item-control-input{
            input,
            textarea{
                color: ${({ theme }) => theme['gray-color']};
                &:placeholder{
                    color: ${({ theme }) => theme['light-color']};
                }
            }
            input[type="password"]{
                padding-top: 12px;
                padding-bottom: 12px;
            }
            .ant-picker-input input{
                padding: 12px;
            }
            button{
                height: 44px;
            }
            .ant-input-affix-wrapper{
                padding: 0 11px;
            }
        }
        .ant-select-single{
            .ant-select-selector{
                padding: 0 20px;
                height: 48px !important;
                border: 1px solid ${({ theme }) => theme['border-color-normal']};
                .ant-select-selection-item{
                    line-height: 46px !important;
                    padding: 0 !important;
                }
                .ant-select-selection-placeholder{
                    line-height: 46px !important;
                }
            }
        }
    }
    .setting-form-actions{
        margin: 48px 0 14px;
        @media only screen and (max-width: 575px){
            margin: 40px 0 14px;
        }
        button{
            border-radius: 6px;
            height: 44px;
            margin-bottom: 14px;
            &.ant-btn-light{
                border: 1px solid ${({ theme }) => theme['border-color-light']};
                background-color: ${({ theme }) => theme['bg-color-light']};
            }
        }
    }
    .ant-form-item-control-input{
        .input-prepend{
            position: absolute;
            ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0 20px;
            height: 48px;
            border-radius: ${({ theme }) => (theme.rtl ? '0 4px 4px 0' : '4px 0 0 4px')};
            z-index: 10;
            border: 1px solid ${({ theme }) => theme['border-color-normal']};
            background-color: ${({ theme }) => theme['bg-color-light']};
            svg,
            i{
                color: ${({ theme }) => theme['gray-color']};
            }
        }
        .input-prepend-wrap{
            .ant-input-number{
                input{
                    ${({ theme }) => (!theme.rtl ? 'padding-left' : 'padding-right')}: 70px;
                }
            }
        }
        .ant-input-number{
            width: 100% !important;
            border: 1px solid ${({ theme }) => theme['border-color-normal']};
        }
    }
    .add-record-form{
        margin: 25px 0 35px 0;
        
        .record-form-actions{
            padding-right: 40px;
        }
        .ant-btn{
            height: 44px;
            font-size: 14px;
            font-weight: 500;
        }
        .ant-radio-group{
            margin-bottom: -4px;
            .ant-radio-wrapper{
                margin-bottom: 4px;
            }
        }
    }
    .adTodo-form{
        .btn-adTodo {
            font-size: 14px;
        }
    }
`;

const CardToolbox = Styled.div`
    .ant-page-header-heading{
        @media only screen and (max-width: 991px){
            flex-flow: column;
            align-items: center;
        }
    }

    .ant-page-header-heading-left{
        @media only screen and (max-width: 575px){
            flex-flow: column;
        }
        @media only screen and (max-width: 800px){
            max-width: 100%;
        }
        .ant-page-header-back{
            @media only screen and (max-width: 575px){
                margin: 0;
                padding: 0;
            }
        }
        .ant-page-header-heading-title{
            @media only screen and (max-width: 575px){
                margin: 10px 0 8px;
                padding: 0;
            }
            &:after{
                @media only screen and (max-width: 575px){
                    display: none;
                }
            }
        }
        .ant-page-header-heading-sub-title{
            @media only screen and (max-width: 575px){
                margin: 0;
                padding: 0;
                flex-flow: column;
            }
            .title-counter{
                @media only screen and (max-width: 575px){
                    margin-bottom: 16px;
                }
            }
        }
    }

    .ant-page-header-heading-title{
        position: relative;
        ${({ theme }) => (theme.rtl ? 'padding-left' : 'padding-right')}: 24px;
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 24px;
        @media only screen and (max-width: 767px){
            ${({ theme }) => (theme.rtl ? 'padding-left' : 'padding-right')}: 12px;
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 12px !important;
        }
        &:after{
            position: absolute;
            ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 0px;
            top: 0;
            height: 100%;
            width: 1px;
            content: '';
            background: ${({ theme }) => theme['border-color-normal']};
        }
    }
    .ant-page-header-heading-sub-title{
        font-weight: 500;
        display: flex;
        align-items: center;
    }
    .ant-select{
        ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 25px;
        @media only screen and (max-width: 575px){
            ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 0;
        }
        .ant-select-selector{
            height: 46px !important;
            min-width: 350px;
            @media only screen and (max-width: 991px){
                min-width: 100%;
            }
        }
        .ant-select-selection-search-input{
            height: 46px;
            border-radius: 23px;
            border: 0 none;
            box-shadow: 0 5px 20px #9299B803;
            input{
                height: 46px !important;
                font-size: 14px;
            }
        }
    }
    .btn-add_new{
        border-radius: 6px;
        height: 40px;
        padding: 0 14px;
        font-size: 12px;
        @media only screen and (max-width: 991px){
            margin-top: 10px;
        }
        a{
            display: flex;
            align-items: center;
            svg{
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 6px;
            }
        }
    }
`;

const FormGroupWrapper = Styled.div`
    .ant-card-body{
        @media only screen and (max-width: 767px){
            padding: 0 !important;
        }
    }
`;

const TableWrapper = Styled.div`
    .ant-pagination-prev, .ant-pagination-next {
        line-height: 28px !important;
        transform: rotateY(${({ theme }) => (theme.rtl ? '180deg' : '0deg')})
    }
    .ant-table table{
        text-align: ${({ theme }) => (!theme.rtl ? 'left' : 'right')};
    }
    .ant-table-thead > tr > th{
        text-align: ${({ theme }) => (!theme.rtl ? 'left' : 'right')};
    }
    span.anticon.anticon-right{
        transform: rotateY(${({ theme }) => (theme.rtl ? '180deg' : '0deg')})
    }
    span.anticon.anticon-left{
        transform: rotateY(${({ theme }) => (theme.rtl ? '180deg' : '0deg')})
    }
    &.table-order,
    &.table-seller,
    &.table-data-view{
        .ant-table-selection{
            .ant-checkbox-indeterminate{
                .ant-checkbox-inner{
                    background: ${({ theme }) => theme['primary-color']};
                    border-color: ${({ theme }) => theme['primary-color']};
                    &:after{
                        height: 2px;
                        background-color: #fff;
                    }
                }
            }
        }
        .ant-table-container{
            padding-bottom: 25px;
            border-bottom: 1px solid ${({ theme }) => theme['border-color-light']};
        }
        tbody{
            tr{
                &:hover{
                    td{
                        background: ${({ theme }) => theme['bg-color-light']};
                    }
                }
                td{
                    .product-id{
                        max-width: 60px;
                        text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
                    }
                }
            }
        }
        .ant-pagination{
            margin-top: 25px !important;
        }
    }
    &.table-data-view{
        .ant-table-container{
            padding-bottom: 0;
        }
        table{
            thead{
                th{
                    padding: 15px 16px;
                }
            }
            tbody{
                td{
                    padding: 11px 16px;
                    .record-img{
                        img{
                            max-width: 38px;
                            border-radius: 50%;
                            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 12px;
                        }
                    }
                    .record-location{
                        display: block;
                        font-size: 12px;
                        font-weight: 400;
                        color: ${({ theme }) => theme['light-color']};
                    }
                    .status{
                        font-weight: 500;
                        text-transform: capitalize;
                        &.active{
                            color: ${({ theme }) => theme['success-color']};
                            background: ${({ theme }) => theme['success-color']}10;
                        }
                        &.deactivated{
                            color: ${({ theme }) => theme['warning-color']};
                            background: ${({ theme }) => theme['warning-color']}10;
                        }
                        &.blocked{
                            color: ${({ theme }) => theme['danger-color']};
                            background: ${({ theme }) => theme['danger-color']}10;
                        }
                    }
                    .table-actions{
                        a{
                            svg, i{
                                width: 16px;
                                color: ${({ theme }) => theme['extra-light-color']};
                            }
                            &.edit{
                                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 6px;
                              &:hover{
                                svg,
                                i{
                                    color: ${({ theme }) => theme['info-color']};
                                }
                              }  
                            }
                            &.delete{
                              &:hover{
                                svg,
                                i{
                                    color: ${({ theme }) => theme['danger-color']};
                                }
                              }  
                            }
                        }
                    }
                }
            }
        }
    }
    table{
        thead{
            tr{
                border-radius: 10px;
                th{
                    &:last-child{
                        text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
                    }
                    color: ${({ theme }) => theme['gray-color']};
                    background: ${({ theme }) => theme['bg-color-light']};
                    border-top: 1px solid ${({ theme }) => theme['border-color-light']};
                    border-bottom: 1px solid ${({ theme }) => theme['border-color-light']};
                    &:first-child{
                        ${({ theme }) => (!theme.rtl ? 'border-left' : 'border-right')}: 1px solid ${({ theme }) =>
        theme['border-color-light']};
                        border-radius: ${({ theme }) => (!theme.rtl ? '10px 0 0 10px' : '0 10px 10px 0')} !important;
                    }
                    &:last-child{
                        ${({ theme }) => (theme.rtl ? 'border-left' : 'border-right')}: 1px solid ${({ theme }) =>
        theme['border-color-light']};
                        border-radius: ${({ theme }) => (!theme.rtl ? '0 10px 10px 0' : '10px 0 0 10px')} !important;
                    }
                }
            }
        }
        tbody{
            tr{
                &:hover{
                    td{
                        background: ${({ theme }) => theme['bg-color-light']};
                    }
                }
                &.ant-table-row-selected{
                    &:hover{
                        td{
                            background: ${({ theme }) => theme['bg-color-light']};
                        }
                    }
                    td{
                        background: ${({ theme }) => theme['bg-color-light']};
                    }
                }
                td{
                    border: 0 none;
                    font-weight: 500;
                    color: ${({ theme }) => theme['dark-color']};
                    &:first-child{
                        border-radius: ${({ theme }) => (!theme.rtl ? '10px 0 0 10px' : '0 10px 10px 0')} !important;
                    }
                    &:last-child{
                        border-radius: ${({ theme }) => (!theme.rtl ? '0 10px 10px 0' : '10px 0 0 10px')} !important;
                    }
                    span{
                        display: block;
                    }
                    .order-id{
                        min-width: 128px;
                    }
                    .customer-name{
                        min-width: 174px;
                    }
                    .status{
                        min-width: 175px;
                    }
                    .ordered-amount{
                        min-width: 175px;
                    }
                    .ordered-date{
                        min-width: 165px;
                    }
                    .table-actions{
                        min-width: 60px;
                    }
                }
            }
        }
        .table-actions{
            text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
            min-width: 150px !important;
            button{
                height: 40px;
                padding: 0 11px;
                background: transparent;
                border: 0 none;
                color: ${({ theme }) => theme['extra-light-color']};
                &:hover{
                    &.ant-btn-primary{
                        color: ${({ theme }) => theme['primary-color']};
                        background: ${({ theme }) => theme['primary-color']}10;
                    }
                    &.ant-btn-info{
                        color: ${({ theme }) => theme['info-color']};
                        background: ${({ theme }) => theme['info-color']}10;
                    }
                    &.ant-btn-danger{
                        color: ${({ theme }) => theme['danger-color']};
                        background: ${({ theme }) => theme['danger-color']}10;
                    }
                }
            }
        }
        .seller-info{
            img{
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 12px;
            }
        }
        .user-info{
            display: flex;
            align-items: center;
            figure{
                margin: 0 8px 0;
            }
            .user-name{
                margin-bottom: 4px;
                font-weight: 500;
            }
            .user-designation{
                font-size: 12px;
                font-weight: 400;
                color: ${({ theme }) => theme['light-color']};
            }
        }
    }    
`;

const DragDropStyle = Styled.div`
    .ant-card-body{
        padding: 15px !important;
    }
    table{
        thead{
            display: none;
        }
        tbody{
            >tr{
                &:not(:last-child){
                    td{
                         border-bottom: 1px solid ${({ theme }) => theme['border-color-normal']} !important;
                    }
                 }
                 &:hover{
                     td{
                         background-color: transparent !important;
                     }
                 }
                >td{
                    font-size: 14px;
                    &:first-child,
                    &:last-child{
                        border-radius: 0 !important;
                    }
                }
            }
        }
        tr{
            td{
                &.drag-visible{
                    svg,
                    img{
                        width: 20px;
                    }
                    svg,
                    i{
                        color: ${({ theme }) => theme['extra-light-color']} !important;
                    }
                }
            }
        }
        .user-info{
            .user-name{
                font-size: 14px;
                margin-left: 8px;
            }
        }
    }
`;
const InvoiceHeader = Styled.div`
    margin: 50px 0;
    @media only screen and (max-width: 575px){
        margin: 25px 0;
    }
    .top-img{
        max-width: 140px;
    }
    figure{
        @media only screen and (max-width: 575px){
            text-align: center;
        }
    }
    .invoice-info{
        font-weight: 500;
        line-height: 1.6;
        text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
        @media only screen and (max-width: 575px){
            text-align: center !important;
            margin-bottom: 0;
        }
    }
`;

const InvoiceLetterBox = Styled.div`
    .invoice-letter-inner{
        background: #F8F9FB;
        padding: 30px 50px 25px;
        border-radius: 20px;
        @media only screen and (max-width: 575px){
            padding: 25px;
        }
    }
    .invoice-author{
        @media only screen and (max-width: 991px){
            text-align: center;
        }
        .invoice-author__title{
            font-size: 36px;
            font-weight: 600;
            margin-bottom: 16px;
            @media only screen and (max-width: 575px){
                font-size: 30px;
            }
        }
        p{
            font-size: 15px;
            font-weight: 500;
            margin-bottom: 4px;
        }
    }
    .invoice-barcode{
        max-width: 310px;
        margin: 0 auto;
        text-align: center;
        border: 1px solid ${({ theme }) => theme['border-color-light']};
        @media only screen and (max-width: 991px){
            margin: 20px auto;
        }
        .ant-card{
            margin-bottom: 0 !important;
        }
        .ant-card-body{
            padding: 20px 20px 16px !important;
        }
        p{
            margin-bottom: 0;
        }
    }
    .invoice-customer{
        float: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
        text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
        @media only screen and (max-width: 991px){
            float: none;
            text-align: center;
        }
        .invoice-customer__title{
            font-size: 15px;
            font-weight: 500;
            text-transform: uppercase;
            margin-bottom: 5px;
            color: ${({ theme }) => theme['dark-color']};
        }
        p{
            font-size: 15px;
            margin-bottom: 0;
            color: ${({ theme }) => theme['gray-color']};
        }
    }
`;

const InvoiceAction = Styled.div`
    text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
    margin: 90px -5px 10px;
    @media only screen and (max-width: 991px){
        margin-top: 50px;
    }
    @media only screen and (max-width: 479px){
        text-align: center;
        margin-top: 30px;
    }
    .ant-btn-default{
        color: ${({ theme }) => theme['gray-color']};
        background: ${({ theme }) => theme['bg-color-light']};
        border: 1px solid ${({ theme }) => theme['border-color-light']};
    }
    button{
        padding: 0 25px !important;
        margin: 5px;
        @media only screen and (max-width: 479px){
            margin-bottom 10px;
        }
        svg,
        i{
            color: ${({ theme }) => theme['light-color']};
        }
        .feather-download{
            color: #fff;
        }
        svg +span{
            ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 6px;
        }
    }
`;

const ProductTable = Styled.div`
    .table-cart{
        .ant-table-content{
            padding-bottom: 10px;
        }
        .ant-table-tbody{
            .cart-single{
                figure{
                    align-items: center;
                    margin-bottom: 0;
                    img{
                        max-width: 80px;
                        min-height: 80px;
                        border-radius: 10px;
                        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 25px;
                    }
                }
                .cart-single__info{
                    h1,
                    h2,
                    h3,
                    h4,
                    h5,
                    h6{
                        font-size: 15px;
                        font-weight: 500;
                    }
                    p{
                        margin-bottom: 0;
                    }
                }
            }
            .ant-table-row{
                &:hover{
                    box-shadow: 0 10px 15px ${({ theme }) => theme['light-color']}15;
                    td{
                        background: #fff !important;
                    }
                    .table-action{
                        button{
                            background: #FF4D4F15;
                            i,
                            svg{
                                color: ${({ theme }) => theme['danger-color']};
                            }
                        }
                    }
                }
            }
        }
    }
    .table-invoice{
        .ant-table table {
            text-align: ${({ theme }) => (theme.rtl ? 'right' : 'left')}
        }
        table{
            thead{
                >tr{
                    th{
                        border-top: 1px solid ${({ theme }) => theme['border-color-light']};
                        border-bottom: 1px solid ${({ theme }) => theme['border-color-light']};
                        &:first-child{
                            ${({ theme }) => (!theme.rtl ? 'border-left' : 'border-right')}: 1px solid ${({ theme }) =>
        theme['border-color-light']};
                        }
                        &:last-child{
                            ${({ theme }) => (theme.rtl ? 'border-left' : 'border-right')}: 1px solid ${({ theme }) =>
        theme['border-color-light']};
                            text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
                        }
                    }
                }
            }
            tbody{
                >tr{
                    &.ant-table-row{
                        &:hover{
                            >td{
                                background: #fff;
                            }
                        }
                    }
                    td{
                        border-bottom: 1px solid ${({ theme }) => theme['border-color-light']};
                        color: ${({ theme }) => theme['gray-color']};
                        border-radius: 0 !important;
                        &:last-child{
                            text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
                        }
                        .product-info-title{
                            font-size: 15px;
                            font-weight: 500;
                            color: ${({ theme }) => theme['dark-color']};
                        }
                        .product-unit{
                            ${({ theme }) => (!theme.rtl ? 'padding-left' : 'padding-right')}: 40px;
                        }
                        .product-quantity{
                            ${({ theme }) => (!theme.rtl ? 'padding-left' : 'padding-right')}: 50px;
                        }
                    }
                }
            }
        }
        .product-info{
            min-width: 300px;
            .product-info{
                margin-bottom: 8px;
            }
        }
    }
    table{
        thead{
            tr{
                border-radius: 10px;
                th{
                    border-bottom: 0 none;
                    background:  ${({ theme }) => theme['bg-color-light']};
                    &:first-child{
                    border-radius: ${({ theme }) => (theme.rtl ? '0 10px 10px 0' : '10px 0 0 10px')} !important;
                    }
                    &:last-child{
                        border-radius: ${({ theme }) => (!theme.rtl ? '0 10px 10px 0' : '10px 0 0 10px')} !important;
                    }
                }
            }
        }
        tbody{
            tr{
                border-radius: 10px;
                td{
                    border-bottom: 0 none;
                    &:first-child{
                        border-radius: ${({ theme }) => (theme.rtl ? '0 10px 10px 0' : '10px 0 0 10px')};
                    }
                    &:last-child{
                        border-radius: ${({ theme }) => (!theme.rtl ? '0 10px 10px 0' : '10px 0 0 10px')} !important;
                    }
                }
            }
        }

        .info-list{
            li{
                display: inline-block;
                &:not(:last-child){
                    ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 20px;
                }
                span{
                    font-size: 14px;
                    color: ${({ theme }) => theme['gray-color']};
                    &.info-title{
                        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 5px;
                        font-weight: 500;
                        color: ${({ theme }) => theme['dark-color']};
                    }
                }
            }
        }
        .cart-single-price{
            font-size: 15px;
            color: ${({ theme }) => theme['gray-color']};
        }
        .cart-single-t-price{
            font-size: 15px;
            font-weight: 500;
            color: ${({ theme }) => theme['primary-color']};
            display: inline-block;
            min-width: 80px;
        }
        .cart-single-quantity{
            button{
                background-color: ${({ theme }) => theme['bg-color-normal']};
                i,
                img,
                svg{
                    min-width: 12px;
                    height: 12px;
                }
                &.btn-inc,
                &.btn-dec{
                    width: 36px;
                    height: 36px;
                }
                &.btn-inc{
                    ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 16px;
                    @media only screen and (max-width: 575px){
                        ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 10px;
                    }
                }
                &.btn-dec{
                    ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 16px;
                    @media only screen and (max-width: 575px){
                        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 10px;
                    }
                }
            }
        }
        .table-action{
            text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
            button{
                padding: 0 11px;
                height: 38px;
                background: #fff;
                i,
                svg{
                    color: #707070;
                }
            }
        }
    }
`;

const OrderSummary = Styled.div`
    max-width: 650px;
    margin: 0 auto;
    .ant-card{
        margin-bottom: 0 !important;
    }
    .ant-card-body{
        box-shadow: 0 10px 30px ${({ theme }) => theme['dark-color']}10;
    }
    .ant-form-item{
        margin-bottom: 0;
    }

    .summary-table-title{
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 25px;
        color: ${({ theme }) => theme['dark-color']};
    }
    .order-summary-inner{
        padding-bottom: 5px;
        @media only screen and (max-width: 1599px){
            max-width: 600px;
            margin: 0 auto;
        }
        .ant-select{
            .ant-select-selection-item{
                font-weight: 500;
            }
        }
    }
    .invoice-summary-inner{
        .summary-list{
            margin: 22px 0;
            li{
                &:not(:last-child){
                    margin-bottom: 12px;
                }
            }
        }
        .summary-total-amount{
            color: ${({ theme }) => theme['primary-color']} !important;
        }
    }

    .summary-list{
        li{
            display: flex;
            justify-content: space-between;
            &:not(:last-child){
                margin-bottom: 18px;
            }
            span{
                font-weight: 500;
            }
            .summary-list-title{
                color: ${({ theme }) => theme['gray-color']};
            }
            .summary-list-text{
                color: ${({ theme }) => theme['dark-color']};
            }
        }
    }
    .ant-select-focused.ant-select-single{
        .ant-select-selector{
            box-shadow: 0 0 !important;
        }
    }
    .ant-select-single{
        margin-top: 18px;
        .ant-select-selection-search-input{
            height: fit-content;
        }
        .ant-select-selector{
            padding: 0 !important;
            border: 0 none !important;
            color: ${({ theme }) => theme['success-color']};
        }
        .ant-select-arrow{
            ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 0;
        }
    }
    .promo-apply-form{
        margin: 5px 0 18px;
        .ant-form-item{
            margin-bottom: 0;
        }
        .ant-row{
            flex-flow: column;
        }
        .ant-form-item-label{
            text-align: ${({ theme }) => (!theme.rtl ? 'left' : 'right')};
            label{
                font-weight: 400;
                margin-bottom: 4px;
                height: fit-content;
                color: ${({ theme }) => theme['gray-color']};
            }
        }
        .ant-form-item-control-input-content{
            display: flex;
            @media only screen and (max-width: 479px){
                flex-flow: column;
            }
            input{
                margin: ${({ theme }) => (theme.rtl ? '0 0 20px 6px' : '0 6px 20px 0')};
                height: 40px;
                @media only screen and (max-width: 479px){
                    width: 100% !important;
                }
            }
            button{
                height: 40px;
            }
        }
    }
    .summary-total{
        display: inline-flex;
        justify-content: space-between;
        width: 100%;
        .summary-total-label{
            font-size: 16px;
            font-weight: 500;
            color: ${({ theme }) => theme['dark-color']};
        }
        .summary-total-amount{
            font-size: 18px;
            font-weight: 600;
            color: ${({ theme }) => theme['primary-color']};
        }
    }
    .btn-proceed{
        font-size: 15px;
        font-weight: 500;
        width: 100%;
        height: 50px;
        border-radius: 8px;
        margin-top: 22px;
        @media only screen and (max-width: 575px){
            font-size: 13px;
        }
        a{
            display: flex;
            align-items: center;
        }
        i,
        svg{
            ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 6px;
        }
    }
    .form-responsive{
        @media only screen and (max-width: 380px){
            width: 100%;
            margin-bottom: 10px;
            justify-content: center !important;
        }
    }
`;

const UserCard = Styled.div`
  text-align: center;
  .card{
    position: relative;
    box-shadow: 0 5px 20px ${({ theme }) => theme['light-color']}03;
    .ant-card-body{
      padding: 30px !important;
      div{
        position: static;
      }
    }
    figure{
      margin-bottom: 0;
      img{
        margin-bottom: 20px;
        width: 100%;
        border-radius: 50%;
        max-width: 150px;
      }
    }
    .card__more_actions{
      position: absolute;
      ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 28px;
      top: 20px;
      color: ${({ theme }) => theme['extra-light-color']};
    }
    .card__name{
      font-size: 16px;
      margin-bottom: 6px;
      font-weight: 500;
      a{
        color: ${({ theme }) => theme['dark-color']};
        &:hover{
          color: ${({ theme }) => theme['primary-color']};
        }
      }
    }
    .card__designation{
      font-size: 13px;
      margin-bottom: 25px;
      color: ${({ theme }) => theme['light-color']};
    }
    .card__social{
      margin-top: 16px;
      a{
        width: 38px;
        height: 38px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 20px ${({ theme }) => theme['light-color']}15;
        background: #fff;
        &:not(:last-child){
          ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 10px;
        }
        &.facebook span.fa{
          color: #3B5998;
        }
        &.twitter span.fa{
          color: #1DA1F2;
        }
        &.dribble span.fa{
          color: #C2185B;
        }
        &.instagram span.fa{
          color: #FF0300;
        }
      }
    }
  }

  .user-card{
    .ant-card-body{
      padding: 30px 25px 18px 25px !important;
      @media only screen and (max-width: 1599px){
        padding: 20px  20px 20px !important;
      }
      @media only screen and (max-width: 767px){
        padding: 15px  15px 15px !important;
      }
    }
    figure{
      img{
        margin-bottom: 18px;
        max-width: 120px;
      }
    }
    .card__actions{
      margin: -5px;
      .ant-btn-white{
        color: ${({ theme }) => theme['gray-color']};
        border: 1px solid ${({ theme }) => theme['border-color-light']};
        &:hover{
          border: 1px solid ${({ theme }) => theme['primary-color']};
        }
      }
      button{
        font-size: 13px;
        padding: 0px 22.7px;
        height: 38px;
        border-radius: 6px;
        box-shadow: 0px 3px 5px ${({ theme }) => theme['light-color']}05;
        margin: 5px;
        &:hover{
          color: #fff !important;
          background-color: ${({ theme }) => theme['primary-color']} !important;
          svg,
          i{
            color: #fff;
          }
        }
        svg,
        i{
          color: ${({ theme }) => theme['light-color']};
        }
      }
    }
    .card__info{
      padding-top: 20px;
      margin-top: 18px;
      border-top: 1px solid ${({ theme }) => theme['border-color-light']};
      .info-single{
        text-align: center;
      }
      .info-single__title{
        font-size: 16px;
        font-weight: 600;
        line-height: 1.5;
        margin-bottom: 4px;
      }
      p{
        margin-bottom: 0;
        color: ${({ theme }) => theme['light-color']};
      }
    }
  }
`;

export {
    Main,
    ButtonsGroupWrapper,
    BlockButtonsWrapper,
    ButtonSizeWrapper,
    BtnWithIcon,
    AlertList,
    AutoCompleteWrapper,
    CalendarWrapper,
    DatePickerWrapper,
    NotificationListWrapper,
    TagInput,
    PageHeaderWrapper,
    MessageStyleWrapper,
    BasicFormWrapper,
    CardToolbox,
    FormGroupWrapper,
    DragDropStyle,
    TableWrapper,
    InvoiceHeader,
    InvoiceLetterBox,
    InvoiceAction,
    ProductTable,
    OrderSummary,
    UserCard
};
