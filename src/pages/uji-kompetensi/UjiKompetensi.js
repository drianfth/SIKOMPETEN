import { Card, CardContent } from "@mui/material";
import React from "react";
import SubTimeLine from "../../components/SubTimeLine";
// import useNavStore from "../../context/useNavStore";

const UjiKompetensi = () => {
  return (
    <div>
      <Card className="shadow-lg ">
        <CardContent>
          <div className="text-center font-bold pb-8 text-xl text-gray-800">
            Uji Kompetensi
            <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
          </div>

          <div className="flex justify-center my-10">
            <ol className="relative border-l w-9/12 ml-4 border-gray-200">
              <SubTimeLine
                title="Pilih Skema & Pengisian Form APL-01"
                time="12, Januari 2023"
                href="apl01"
                active
              />
              <SubTimeLine
                title="Pengisian Form APL-02"
                time="13, Januari 2023"
                content="        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid maiores commodi doloribus beatae nesciunt id, iusto neque maxime. Ratione adipisci debitis, delectus reiciendis maxime placeat. Pariatur nisi adipisci aspernatur officiis earum beatae sit consectetur quasi tenetur molestiae. Ex, adipisci velit mollitia possimus sunt harum in provident non rem sit labore?"
              />
              <SubTimeLine
                title="Pelaksanaan Asesmen"
                time="14, Januari 2023"
                content="        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid maiores commodi doloribus beatae nesciunt id, iusto neque maxime. Ratione adipisci debitis, delectus reiciendis maxime placeat. Pariatur nisi adipisci aspernatur officiis earum beatae sit consectetur quasi tenetur molestiae. Ex, adipisci velit mollitia possimus sunt harum in provident non rem sit labore?"
              />
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UjiKompetensi;
