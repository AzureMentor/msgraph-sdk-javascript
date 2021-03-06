import { assert } from 'chai'

import { getClient, randomString } from "../test-helper"
import { Group } from '@microsoft/microsoft-graph-types'

declare const describe, it;

describe('Groups', function () {
    this.timeout(10 * 1000);
    it('Fetch a list of groups and access properties on a collection item', function () {
        return getClient().api("/groups").get().then((json) => {
            const group = json.value[0] as Group;
            assert.isDefined(group.displayName);
            assert.isDefined(group.mail);
            assert.isDefined(group.id);

            assert.isUndefined(group['invalidPropertyName']);
            return Promise.resolve();
        });
    });

    it('Create a group and validate properties were set', function () {
        const group: Group = {
            displayName: randomString(),
            description: randomString(),
            groupTypes: [
                "Unified"
            ],
            mailEnabled: true,
            mailNickname: randomString(),
            securityEnabled: true
        };

        return getClient().api("/groups").post(group).then((groupResponse) => {
            let createdGroup = groupResponse as Group;
            assert.equal(createdGroup.displayName, group.displayName);
            assert.equal(createdGroup.description, group.description);
            assert.equal(createdGroup.mailEnabled, group.mailEnabled);
            assert.isString(createdGroup.id);
            return Promise.resolve();
        });
    });
});
