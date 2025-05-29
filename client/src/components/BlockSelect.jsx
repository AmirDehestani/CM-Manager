const BlockSelect = () => {
    const _IMAGE = '_IMAGE%s';
    const _URL = '_URL%s';
    const _Title_Text = '_Title_Text%s';
    const _Body_Copy = '_Body_Copy%s';
    const _CTA_Text = '_CTA%s_Text';
    const _Block_Title_Text = '_Block_Title_Text';
    const _Stat_Label = 'Stat%s_Label';
    const _STARTDATE = '_STARTDATE';
    const _ENDDATE = '_ENDDATE';


    const BLOCKS = {
        'FWIMG': [_IMAGE, _URL],
        'TITTC': [_IMAGE, _Title_Text, _Body_Copy, _CTA_Text, _URL],
        'RITTC': [_Title_Text, _Body_Copy, _CTA_Text, _URL],
        'LITTC': [_Title_Text, _Body_Copy, _CTA_Text, _URL],
        'TTC': [_Title_Text, _Body_Copy, _CTA_Text, _URL],
        'TT': [_Body_Copy],
        '2I2TTC': [_Block_Title_Text, {[_IMAGE]: 2}, {[_Title_Text]: 2}, {[_Body_Copy]: 2}, {[_CTA_Text]: 2}, {[_URL]: 2}],
        '3I3TTC': [_Block_Title_Text, {[_IMAGE]: 3}, {[_Title_Text]: 3}, {[_Body_Copy]: 3}, {[_CTA_Text]: 3}, {[_URL]: 3}],
        '2CTA': [{[_CTA_Text]: 2}, {[_URL]: 2}],
        '3CTA': [{[_CTA_Text]: 3}, {[_URL]: 3}],
        '2HALFIMG': [{[_IMAGE]: 2}, {[_URL]: 2}],
        'ITTCI': [_Block_Title_Text, {[_IMAGE]: 2}, _Title_Text, _Body_Copy, _CTA_Text, _URL],
        'STATS': [_Block_Title_Text, {[_Stat_Label]: 6}, _CTA_Text, _URL],
        'TEMPFWIMG': [_IMAGE, _URL, _STARTDATE, _ENDDATE],
        'MITTC': [_IMAGE, _Title_Text, _Body_Copy, _CTA_Text, _URL]
    }

    function isObject(objValue) {
        return objValue && typeof objValue === 'object' && objValue.constructor === Object;
    }

    const getVars = (blockName, count=1) => {
        const rawVars = BLOCKS[blockName];
        let vars = [];

        for (let i = 0; i < rawVars.length; i++) {
            if (isObject(rawVars[i])) {
                const key = Object.keys(rawVars[i])[0];
                const varCount = rawVars[i][key];
                for (let j = 1; j <= varCount; j++) {
                    vars.push(`${blockName}${count > 1 ? count : ''}${key}`.format(j));
                }
            } else {
                vars.push(`${blockName}${count > 1 ? count : ''}${rawVars[i]}`.format(''));
            }
        }

        return vars;
    }

    return (
        <select>
            {Object.keys(BLOCKS).map((key, index) =>
                <option key={index} value={key}>
                    {key}
                </option>
            )}
        </select>
    )
}

export default BlockSelect;