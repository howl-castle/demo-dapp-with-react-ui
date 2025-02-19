import {BorderRadius, Locales, ReturnStrategy, Theme, THEME, useTonConnectUI} from "@tonconnect/ui-react";
import './footer.scss';
import {useEffect, useState} from "react";
import {ColorsModal} from "./ColorsModal/ColorsModal";

const defaultWalletsSelectValue = '["Tonkeeper", "OpenMask"]';

export const Footer = () => {
    const [checkboxes, setCheckboxes] = useState(
        [true, false, false, true, true, true]
    );

    const [walletsSelect, setWalletsSelect] = useState(defaultWalletsSelectValue);
    const [returnStrategy, setReturnStrategy] = useState('back');

    const [_, setOptions] = useTonConnectUI();

    const onLangChange = (lang: string) => {
        setOptions({language: lang as Locales})
    }

    const onThemeChange = (theme: string) => {
        setOptions({uiPreferences: {theme: theme as Theme}})
    }

    const onBordersChange = (borders: string) => {
        setOptions({uiPreferences: {borderRadius: borders as BorderRadius}})
    }

    const onCheckboxChange = (position: number) => {
        setCheckboxes(state => state.map((item, index) => index === position ? !item : item ));
    }

    const onWalletsInputBlur = () => {
        try {
            const wallets = JSON.parse(walletsSelect);
            if (!Array.isArray(wallets)) {
                throw new Error();
            }

            if (wallets.length > 2) {
                throw new Error();
            }
/*
            setOptions({
                walletsListConfiguration: {
                    walletsOrder: wallets
                }
            })
*/
        } catch (e) {
            setWalletsSelect(defaultWalletsSelectValue);
            alert('Wrong wallets input. Should be an array of strings "Tonkeeper" or "OpenMask"');
        }
    }

    const onReturnStrategyInputBlur = () => {
        if (!returnStrategy) {
            setReturnStrategy('back');
            return;
        }

        setOptions({ actionsConfiguration: { returnStrategy: returnStrategy as ReturnStrategy } })

    }

    useEffect(() => {
        const actionValues = ['before', 'success', 'error'];
        const modals = actionValues.map((item, index) => checkboxes[index] ? item : undefined).filter(i => i) as ("before" | "success" | "error")[];
        const notifications = actionValues.map((item, index) => checkboxes[index + 3] ? item : undefined).filter(i => i) as ("before" | "success" | "error")[];

        setOptions({ actionsConfiguration: { modals, notifications } })
    }, [checkboxes])

    return <footer className="footer">
        <div>
            <label>language</label>
            <select onChange={e => onLangChange(e.target.value)}>
                <option value="en">en</option>
                <option value="ru">ru</option>
            </select>
        </div>

        <div>
            <label>theme</label>
            <select onChange={e => onThemeChange(e.target.value)}>
                <option value={THEME.DARK}>dark</option>
                <option value={THEME.LIGHT}>light</option>
                <option value="SYSTEM">system</option>
            </select>
        </div>

        <div>
            <label>borders</label>
            <select onChange={e => onBordersChange(e.target.value)}>
                <option value="m">m</option>
                <option value="s">s</option>
                <option value="none">none</option>
            </select>
        </div>

        <div className="footer-checkbox-container">
            <span>modals</span>
            <label>
                before
                <input type="checkbox" checked={checkboxes[0]} onChange={() => onCheckboxChange(0)}/>
            </label>
            <label>
                success
                <input type="checkbox" checked={checkboxes[1]} onChange={() => onCheckboxChange(1)}/>
            </label>
            <label>
                error
                <input type="checkbox" checked={checkboxes[2]} onChange={() => onCheckboxChange(2)}/>
            </label>
        </div>

        <div className="footer-checkbox-container">
            <span>notifications</span>
            <label>
                before
                <input type="checkbox" checked={checkboxes[3]} onChange={() => onCheckboxChange(3)}/>
            </label>
            <label>
                success
                <input type="checkbox" checked={checkboxes[4]} onChange={() => onCheckboxChange(4)}/>
            </label>
            <label>
                error
                <input type="checkbox" checked={checkboxes[5]} onChange={() => onCheckboxChange(5)}/>
            </label>
        </div>

        <div>
            <ColorsModal />
        </div>

        <div>
            <label>
                wallets:
                <input
                    style={{ width: '200px' }}
                    value={walletsSelect}
                    onChange={e => setWalletsSelect(e.target.value)} onBlur={onWalletsInputBlur}
                />
            </label>
        </div>

        <div>
            <label>
                return strategy:
                <input
                    style={{ width: '200px' }}
                    value={returnStrategy}
                    onChange={e => setReturnStrategy(e.target.value)} onBlur={onReturnStrategyInputBlur}
                />
            </label>
        </div>
    </footer>
}
