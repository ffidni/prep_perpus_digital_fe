import { PERPUSTAKAAN_ASSETS } from '../constants';

export default class Helper {
  static createAssetsLink(link) {
    return `${PERPUSTAKAAN_ASSETS}/${link}`;
  }
}
