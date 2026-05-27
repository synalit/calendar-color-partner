import { patch } from "@web/core/utils/patch";
import { usePopover } from "@web/core/popover/popover_hook";
import { ColorList } from "@web/core/colorlist/colorlist";
import { CalendarFilterPanel } from "@web/views/calendar/filter_panel/calendar_filter_panel";
import { _t } from "@web/core/l10n/translation";
import { Component } from "@odoo/owl";

class PartnerColorPickerPopover extends Component {
    static template = "calendar_color_partner.PartnerColorPickerPopover";
    static components = { ColorList };
    static props = {
        colors: Array,
        selectedColor: { type: Number, optional: true },
        onColorSelected: Function,
        close: Function,
    };
}

patch(CalendarFilterPanel.prototype, {
    setup() {
        super.setup(...arguments);
        this.colorPickerPopover = usePopover(PartnerColorPickerPopover);
    },

    get partnerColorPickerTitle() {
        return _t("Pick a color");
    },

    isPartnerSection(section) {
        const field = this.props.model.fields[section.fieldName];
        return field && field.relation === "res.partner";
    },

    canPickColor(section, filter) {
        return (
            this.isPartnerSection(section) &&
            filter.type !== "all" &&
            !!filter.value
        );
    },

    onPartnerColorClick(section, filter, ev) {
        ev.preventDefault();
        ev.stopPropagation();
        if (!this.canPickColor(section, filter)) {
            return;
        }
        if (this.colorPickerPopover.isOpen) {
            this.colorPickerPopover.close();
            return;
        }
        const current = Number.isInteger(filter.colorIndex) ? filter.colorIndex : 0;
        this.colorPickerPopover.open(ev.currentTarget, {
            colors: [...Array(12).keys()],
            selectedColor: current,
            onColorSelected: (colorIndex) => this.switchPartnerColor(filter, colorIndex),
        });
    },

    async switchPartnerColor(filter, colorIndex) {
        await this.orm.write("res.partner", [filter.value], { color: colorIndex });
        this.colorPickerPopover.close();
        await this.props.model.load();
    },
});
