import {Card, CardHeader, CardMedia, Grid, styled} from "@mui/material";
import {API_URL} from "../../../constants";
import React from "react";
import {Link} from "react-router-dom";

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

const StyledLink = styled(Link)({
    color: 'inherit',
    textDecoration: 'none',
});

interface Props {
    _id:string;
    name: string;
    image: string |null;
}

const MyCocktailItem: React.FC<Props> = ({_id, name, image}) => {
    let cardImage;
    if (image) {
        cardImage = `${API_URL}/${image}`;
    }

    return (
        <Grid item sx={{ width: '330px' }}>
            <Card sx={{ height: '100%' }}>
                <StyledLink to={`/my_cocktails/${_id}`}>
                    <CardHeader title={name} />
                    <ImageCardMedia image={cardImage} title={name} />
                </StyledLink>
            </Card>
        </Grid>
    );
};

export default MyCocktailItem;