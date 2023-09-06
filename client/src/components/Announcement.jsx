import styled from "styled-components";
import { mobile } from "../responsive";
const Containter = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Announcement = () => {
  return <Containter>Super Deal! Free Shipping on Orders Over $50</Containter>;
};

export default Announcement;
