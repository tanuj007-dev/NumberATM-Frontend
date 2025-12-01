import { Link, useNavigate } from "react-router-dom";
import slugify from "slugify";

const data = {
  categories: [
    { label: "Numerology-Without-2-4-8", value: "Numerology-Without-2-4-8" },
    { label: "PENTA-NUMBERS", value: "PENTA-NUMBERS" },
    { label: "HEXA-NUMBER", value: "HEXA-NUMBER" },
    { label: "SEPTA-9XY-AAA-AAA-A", value: "SEPTA-%289XY-AAA-AAA-A%29" },
    { label: "OCTA-NUMBERS", value: "OCTA-NUMBERS" },
    { label: "ENDING-AAAA-NUMBERS", value: "ENDING-AAAA-NUMBERS" },
    { label: "AB-AB-XXXXXX-1212", value: "AB-AB-%28XXXXXX-1212%29" },
    { label: "ABC-ABC-NUMBERS", value: "ABC-ABC-NUMBERS" },
    { label: "MIRROR-NUMBERS", value: "MIRROR-NUMBERS" },
    { label: "SEMI-MIRROR-NUMBERS", value: "SEMI-MIRROR-NUMBERS" },
    { label: "123456-NUMBERS", value: "123456-NUMBERS" },
    { label: "786-NUMBERS", value: "786-NUMBERS" },
    { label: "11-12-13-NUMBERS", value: "11-12-13-NUMBERS" },
    { label: "UNIQUE-NUMBERS", value: "UNIQUE-NUMBERS" },
    { label: "AAA-BBB", value: "AAA-BBB" },
    { label: "XY-XY-XY-NUMBERS", value: "XY-XY-XY-NUMBERS" },
    { label: "DOUBLING-NUMBERS", value: "DOUBLING-NUMBERS" },
    { label: "ENDING-AAA-NUMBERS", value: "ENDING-AAA-NUMBERS" },
    { label: "AB-XYXYXYXY", value: "AB-XYXYXYXY" },
    { label: "ABCD-ABCD-NUMBERS", value: "ABCD-ABCD-NUMBERS" },
    { label: "AAAA-BBBB-NUMBERS", value: "AAAA-BBBB-NUMBERS" },
    { label: "3-DIGITS-NUMBER", value: "3-DIGITS-NUMBER" },
    { label: "AB-AB-XY-XY", value: "AB-AB-XY-XY" },
    { label: "AAA-XY-AAA", value: "AAA-XY-AAA" },
    { label: "AOOB-COOD-ABOO-CDOO-OOOAB", value: "AOOB-COOD-%2F-ABOO-CDOO-%2F-OOOAB" },
    { label: "AAAA-MIDDLE", value: "AAAA-MIDDLE" },
    { label: "AO-BO-CO-DO-EO", value: "AO-BO-CO-DO-EO" },
    { label: "AAA-MIDDLE", value: "AAA-MIDDLE" },
    { label: "AOO-BOO/AOO-BOO-COO", value: "AOO-BOO-%2F-AOO-BOO-COO" },
    { label: "START-A-OOO-B-END-A-OOO-B", value: "START-A-OOO-B-END-A-OOO-B" },
    { label: "AAAA-XY-AAAA", value: "AAAA-XY-AAAA" }
  ],

  states: [
    "Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
    "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh",
    "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ]
};
function generateCitySlug(name) {
  return slugify(`vip numbers in ${name}`, {
    lower: true,
    strict: true,     // removes special characters like &, !, @, etc.
    replacement: '-', // use hyphens to separate words
  });
}
const CategoriesAndStates = () => {
  const navigate = useNavigate();
  return (
    <div className=" bg-transparent  text-white">
      <div className="mb-6">
        <h2 className="text-xl  font-semibold mb-2 border-b-2 inline-block border-[#F5C037]">CATEGORIES</h2>
        <div className="flex text-justify flex-wrap gap-2">
          {data.categories.map((category, index) => (
            <Link to={`/numerology-vip-numbers?category=${category.value}`} target="_blank" key={index} className="text-sm flex gap-1 text-white hover:text-[#F5C037] hover:underline cursor-pointer">
              {category.label}  <span className="ml-0.5">|</span>
            </Link>
          ))}
        </div>
      </div>

      <div>
         <h2 className="text-xl font-semibold mb-2 border-b-2 inline-block border-[#F5C037]">CITIES & STATES</h2>
        <div className="flex flex-wrap gap-2">
          {data.states.map((state, index) => (
            <Link to={`/${generateCitySlug(state)}`} key={index} target="_blank" className="text-sm text-white flex gap-1 hover:text-[#F5C037] hover:underline cursor-pointer">
              {state} <span className="ml-0.5">|</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesAndStates;
