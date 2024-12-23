import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconName, IconPrefix} from "@fortawesome/fontawesome-common-types";
// import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {RotateProp} from "@fortawesome/fontawesome-svg-core";

export const IconLoaderMap: any = {
    far: {
        // user: regular('user'),
        // 'address-card': regular('address-card'),
        // building: regular('building'),
        // envelope: regular('envelope'),
        // calendar: regular('calendar'),
        // file: regular('file'),
        // clipboard: regular('clipboard'),
        // clone: regular('clone'),
        // copyright: regular('copyright'),
        // clock: regular('clock')
    },
    fas: {
        // 'info-circle': solid('info-circle'),
        // 'ellipsis-v': solid('ellipsis-v'),
        // 'chevron-down': solid('chevron-down'),
        // building: solid('building'),
        // hourglass: solid('hourglass'),
        // clone: solid('clone'),
        // users: solid('users'),
        // bell: solid('bell'),
        // 'power-off': solid('power-off')
    },

    fal: {

    }
}

export type IconDefinitionType = [IconPrefix, IconName]

const Icon = ({icon, spin = false, className, rotation}: {
    icon: IconDefinitionType,
    spin?: boolean,
    className?: string,
    rotation?: RotateProp
}) => {
    const [iconPrefix, iconName] = icon;


    if (IconLoaderMap[iconPrefix][iconName] === undefined)
        console.log('Missing Icon:', iconPrefix, iconName)

    const iconDefinition = IconLoaderMap[iconPrefix][iconName] || null;
    return <></>
    // return <FontAwesomeIcon {...{className, spin, rotation}} icon={iconDefinition}/>
}

export default Icon;
