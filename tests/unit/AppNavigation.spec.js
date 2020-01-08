// AppNavigation.spec.js

import { shallowMount, mount } from '@vue/test-utils'
import AppNavigation from "@/components/AppNavigation.vue";

describe('AppNavigation', () => {

  const wrapper = shallowMount(AppNavigation, {
    mocks: {
      $vuetify: { breakpoint: {} }
    }
  })

  it('appNav existe', () => {
    let appNav = wrapper.find('#appNav');
    expect(appNav.exists()).toBe(true);
  })

  it('searchField existe', () => {
    let searchField = wrapper.find('#searchField');
    expect(searchField.exists()).toBe(true);
  })

  it('filterBtn existe', () => {
    let filterBtn = wrapper.find('#filterBtn');
    expect(filterBtn.exists()).toBe(true);
  })

  it('userBtn existe', () => {
    let userBtn = wrapper.find('.userBtn');
    expect(userBtn.exists()).toBe(true);
  })

  it('userBtn click funciona', () => {
    let userBtn = wrapper.find('.userBtn');
    userBtn.trigger('click')
  })

  it('userBtn tem accountIcon', () => {
    let accountIcon = wrapper.find('.accountIcon');
    expect(accountIcon.exists()).toBe(true);
  })

  

})