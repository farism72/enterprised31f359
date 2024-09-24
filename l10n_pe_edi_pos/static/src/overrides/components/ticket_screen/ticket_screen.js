/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { TicketScreen } from "@point_of_sale/app/screens/ticket_screen/ticket_screen";
import { AddInfoPopup } from "@l10n_pe_edi_pos/app/add_info_popup/add_info_popup";

patch(TicketScreen.prototype, {
    //@override
    async addAdditionalRefundInfo(order, destinationOrder) {
        // Open the popup 'Additional Refund Information' when clicking on the 'Refund' button for an invoiced pos_order
        if (this.pos.company.account_fiscal_country_id.code === "PE" && order.account_move) {
            const { confirmed, payload } = await this.popup.add(AddInfoPopup, { order:destinationOrder });
            if (confirmed) {
                destinationOrder.l10n_pe_edi_refund_reason = payload.l10n_pe_edi_refund_reason;
            }
        }
        super.addAdditionalRefundInfo(...arguments);
    },
});
