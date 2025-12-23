import partneroneImage from "../../../assets/Logo-Ipsum-1-1.png";
import partnertwoImage from "../../../assets/Logo-Ipsum-2-1.png";
import partnerthreeImage from "../../../assets/Logo-Ipsum-3-1.png";
import partnerfourImage from "../../../assets/Logo-Ipsum-4-1.png";
import partnerfiveImage from "../../../assets/Logo-Ipsum-5-1.png";
import partnersixImage from "../../../assets/Logo-Ipsum-6-1.png";
import partnersevenImage from "../../../assets/Logo-Ipsum-7-1.png";
import partnereightImage from "../../../assets/Logo-Ipsum-8-1.png";
import partnernineImage from "../../../assets/Logo-Ipsum-9-1.png";
import partnertenImage from "../../../assets/Logo-Ipsum-10-1.png";

const partners = [
  { src: partneroneImage, alt: "Partner One" },
  { src: partnertwoImage, alt: "Partner Two" },
  { src: partnerthreeImage, alt: "Partner Three" },
  { src: partnerfourImage, alt: "Partner Four" },
  { src: partnerfiveImage, alt: "Partner Five" },
  { src: partnersixImage, alt: "Partner Six" },
  { src: partnersevenImage, alt: "Partner Seven" },
  { src: partnereightImage, alt: "Partner Eight" },
  { src: partnernineImage, alt: "Partner Nine" },
  { src: partnertenImage, alt: "Partner Ten" },
];

const PartnerShip = () => {
  return (
    <div className="mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center font-semibold text-xl">
          Partners & Integrations
        </h1>

        <div className="flex justify-center flex-wrap items-center gap-6 mt-8">
          {partners.map((partner, index) => (
            <img
              key={index}
              src={partner.src}
              alt={partner.alt}
              className="h-12 sm:h-16 max-w-[120px] object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerShip;
