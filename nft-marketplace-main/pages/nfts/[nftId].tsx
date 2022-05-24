import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import { useMarketplace, useNFTCollection } from '@thirdweb-dev/react'
import {
  AuctionListing,
  DirectListing,
  NFTMetadataOwner,
} from '@thirdweb-dev/sdk'
import { useRouter } from 'next/router'
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetails from '../../components/nft/GeneralDetails'
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}

const Nft = () => {
  const marketplace = useMarketplace(
    '0xad95862659dF37d05B942d502f02F724a49B636a'
  )
  const nftCollection = useNFTCollection(
    '0xD38DDD47d3A23D053fE0E90178a94f5cEa1B33b7'
  )
  const [selectedNft, setSelectedNft] = useState<NFTMetadataOwner>()
  const [listings, setListings] = useState<(AuctionListing | DirectListing)[]>(
    []
  )
  const router = useRouter()

  useEffect(() => {
    if (!nftCollection) return
    ;(async () => {
      const nfts = await nftCollection.getAll()
      const selectedNftItem = nfts.find(
        (nft) => nft.metadata.id._hex === router.query.nftId
      )
      setSelectedNft(selectedNftItem)
    })()
  }, [nftCollection])

  useEffect(() => {
    if (!marketplace) return
    ;(async () => {
      setListings(await marketplace.getAllListings())
    })()
  }, [marketplace])

  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNft} />
              <Purchase
                isListed={router.query.isListed}
                selectedNft={selectedNft}
                listings={listings}
                marketPlace={marketplace}
              />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
    </div>
  )
}

export default Nft
