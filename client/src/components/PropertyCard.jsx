import PropTypes from "prop-types";
import { Typography, Card, CardContent } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { htmlToText } from "html-to-text";

const PropertyCard = ({ img, price, title, description, city, _id }) => {
  const { palette } = useTheme();

  const sanitizedDescription = htmlToText(description);

  return (
    <Card sx={{ mt: 1, mb: 5, mx: 1, boxShadow: "none", cursor: "pointer" }}>
      <div className="card-top">
        <img src={img} width="100%" alt={title} />
      </div>
      <Link to={`/properties/city/${city}/property/${_id}`}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="text.secondary"
          >
            ${price}
          </Typography>
          <Typography
            variant="h5"
            fontWeight={600}
            color={palette.my.main}
            noWrap
          >
            {htmlToText(title)}
          </Typography>
          <Typography variant="body1" color="GrayText" noWrap>
            {sanitizedDescription}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

PropertyCard.propTypes = {
  img: PropTypes.string,
  city: PropTypes.string,
  _id: PropTypes.string,
  price: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default PropertyCard;
