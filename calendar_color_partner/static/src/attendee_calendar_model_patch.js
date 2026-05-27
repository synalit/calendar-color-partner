import { patch } from "@web/core/utils/patch";
import { AttendeeCalendarModel } from "@calendar/views/attendee_calendar/attendee_calendar_model";

patch(AttendeeCalendarModel.prototype, {
    async fetchPartnerColors(partnerIds) {
        const ids = [...new Set(partnerIds.filter(Boolean))];
        if (!ids.length) {
            return {};
        }
        const partners = await this.orm.read("res.partner", ids, ["color"]);
        const colorByPartner = {};
        for (const partner of partners) {
            colorByPartner[partner.id] = partner.color || 0;
        }
        return colorByPartner;
    },

    async updateAttendeeData(data) {
        await super.updateAttendeeData(data);

        const partnerIds = [];
        const partnersSection = data.filterSections.partner_ids;
        if (partnersSection) {
            for (const filter of partnersSection.filters) {
                if (filter.type !== "all" && filter.value) {
                    partnerIds.push(filter.value);
                }
            }
        }
        for (const record of Object.values(data.records)) {
            if (record.attendeeId) {
                partnerIds.push(record.attendeeId);
            }
        }
        if (!partnerIds.length) {
            return;
        }

        const colorByPartner = await this.fetchPartnerColors(partnerIds);

        if (partnersSection) {
            for (const filter of partnersSection.filters) {
                if (filter.type !== "all" && filter.value && filter.value in colorByPartner) {
                    filter.colorIndex = colorByPartner[filter.value];
                }
            }
        }
        for (const record of Object.values(data.records)) {
            if (record.attendeeId && record.attendeeId in colorByPartner) {
                record.colorIndex = colorByPartner[record.attendeeId];
            }
        }
    },
});
