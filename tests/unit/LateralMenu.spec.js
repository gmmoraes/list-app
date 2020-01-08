// LateralMenu.spec.js

import { shallowMount } from '@vue/test-utils'
import LateralMenu from "@/components/LateralMenu.vue";

describe('LateralMenu', () => {

  const wrapper = shallowMount(LateralMenu)

  it('Btn para fechar filtro existe', () => {
    let btn = wrapper.find('#closeButton');
    expect(btn.exists()).toBe(true);
  })


})