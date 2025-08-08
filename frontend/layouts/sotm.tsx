import Carousel from "@/components/carousel/psotm";
import slide1 from "@/assets/images/kahim.jpg";
import slide2 from "@/assets/images/wakahim.webp";
import slide3 from "@/assets/images/bendum.jpg";
import slide4 from "@/assets/images/sekum.jpeg";

const items = [
  {
    image: slide1,
    title: "Staff of the Month",
    name: "Takamine Annin",
    division: "Divisi Eksternal",
    month: "Juni",
  },
  {
    image: slide2,
    title: "Staff of the Month",
    name: "Yosano Akiko",
    division: "Divisi PSDM",
    month: "Juli",
  },
  {
    image: slide3,
    title: "Staff of the Month",
    name: "Edogawa Ranpo",
    division: "Divisi PSI",
    month: "Agustus",
  },
  {
    image: slide4,
    title: "Staff of the Month",
    name: "Osamu Dazai",
    division: "Divisi Bikraf",
    month: "September",
  },
];

export default function SOTMLayout() {
  return <Carousel items={items} />;
}
