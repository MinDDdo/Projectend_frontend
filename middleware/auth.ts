import _ from 'lodash';
import { checkToken } from '~/services/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!await checkToken()) {
        return await navigateTo('/');
    }
})