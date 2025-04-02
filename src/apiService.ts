import { Photo } from "./DataTypes";

export default async function getImages() {
    const response = await fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=Bf5sHfFgMd5ZO0flYoEeNH59dsX3cvWATjVHIalm");
    const data = await response.json();
    return data.photos as Photo[];
}