import { Composition } from "remotion";
import { ProductAd, type ProductAdProps } from "./ProductAd";
import { LaunchVideo } from "./LaunchVideo";

export const RemotionRoot = () => {
  const defaultProps: ProductAdProps = {
    productTitle: "Premium Product",
    productPrice: "₦25,000",
    productImage: null,
    vendorName:   "My Store",
    brandColor:   "#6366f1",
    logoUrl:      null,
    ctaText:      "Shop Now",
  };

  return (
    <>
      <Composition
        id="ProductAd"
        component={ProductAd}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={defaultProps}
      />
      <Composition
        id="LaunchVideo"
        component={LaunchVideo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
