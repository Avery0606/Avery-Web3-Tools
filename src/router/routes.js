import NftTraderTools from '@/views/nftTraderTools'
import OtherTools from '@/views/otherTools'

export default [
  {
    path: '/nftTraderTools',
    name: 'nftTraderTools',
    component: NftTraderTools
  },
  {
    path: '/otherTools',
    name: 'otherTools',
    component: OtherTools
  },
  {
    path: '/',
    redirect: 'nftTraderTools'
  }
]