// UserTable.spec.js

import { shallowMount } from '@vue/test-utils'
import UserTable from "@/components/UserTable.vue";

describe('UserTable', () => {
    
    const wrp = shallowMount(UserTable)
    

    it('containerFooter existe', () => {
        let btn = wrp.find('.containerFooter');
        expect(btn.exists()).toBe(true);
    })

    it('table existe', () => {
        let userTable = wrp.find('#user-table');
        expect(userTable.exists()).toBe(true);
    })



})

