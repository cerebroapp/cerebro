import toString from './toString';
import convertMacKey from './convertMacKey';
import { socialProfileKeys } from './labelMappings';

/**
 * Get list of user messaging services
 *
 * @param  {macOS.ABPerson} person
 * @return {Object}
 */
export default function getServices(macOS, person) {
  const profiles = [];
  const macProfiles = person('valueForProperty', macOS.kABSocialProfileProperty)
  if (!macProfiles) return profiles;
  const count = macProfiles('count');
  for (var i = 0; i < count; i++) {
    const macProfile = macProfiles('valueAtIndex', i);
    const url = toString(macProfile('objectForKey', macOS.kABSocialProfileURLKey));
    const macService = toString(macProfile('objectForKey', macOS.kABSocialProfileServiceKey));
    const userName = toString(macProfile('objectForKey', macOS.kABSocialProfileUsernameKey));
    const userId = toString(macProfile('objectForKey', macOS.kABSocialProfileUserIdentifierKey));

    const profile = {
      url,
      userName,
      userId,
      service: convertMacKey(macOS, macService, socialProfileKeys),
    }
    profiles.push(profile);
  }
  return profiles;
}
