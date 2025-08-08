import Carousel from "@/components/carousel/psotm";
import slide1 from "@/assets/images/kahim.jpg";
import slide2 from "@/assets/images/wakahim.webp";
import slide3 from "@/assets/images/bendum.jpg";
import slide4 from "@/assets/images/sekum.jpeg";

const items = [
  {
    image: slide1,
    title: "Presidium of the Month",
    name: "Takamine Annin",
    division: "Divisi Eksternal",
    month: "Juni",
  },
  {
    image: slide2,
    title: "Presidium of the Month",
    name: "Takamine Annin",
    division: "Divisi Eksternal",
    month: "Juli",
  },
  {
    image: slide3,
    title: "Presidium of the Month",
    name: "Takamine Annin",
    division: "Divisi Eksternal",
    month: "Agustus",
  },
  {
    image: slide4,
    title: "Presidium of the Month",
    name: "Takamine Annin",
    division: "Divisi Eksternal",
    month: "September",
  },
];

export default function POTMLayout() {
  return <Carousel items={items} />;
}
