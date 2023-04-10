import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  CardHeader,
} from "@mui/material";
import styles from "./Images.module.css";
import { useForm } from "react-hook-form";
import { FormInputText } from "@/components/form/FormInputText";
import { FormInputDropdown } from "@/components/form/FormInputDropdown";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

type Props = {};

const Images = (props: Props) => {
  const [pics, setPics] = useState<GiphyPic[]>([]);
  const [displayPics, setDisplayPics] = useState<GiphyPic[]>([]);
  const [pointer, setPointer] = useState(0);
  const [searchData, setSearchData] = useState<searchData>();

  const selectOption = [
    { value: "1", text: "On top of image - center top" },
    { value: "2", text: "On top of image - center bottom" },
    { value: "3", text: "Below image - center" },
  ];
  interface IFormInput {
    search: string;
    title: string;
    location: string;
  }

  const defaultValues = {
    search: "",
    title: "",
    location: "1",
  };
  const methods = useForm<IFormInput>({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue, watch } = methods;

  const callAPI = async (searchTerm: string) => {
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/stickers/search?q=${searchTerm}&limit=10&rating=g&api_key=1bkG7ky5cmw5SLyvNfElcR1iYVzs38Zq`
      );
      const data = await res.json();

      const pictures: GiphyPic[] = data.data.map((p: any) => {
        return {
          id: p.id,
          title: p.title,
          url: p.images.downsized_medium.url,
        };
      });
      return pictures;
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data: IFormInput) => {
    setSearchData(data);
    setPics([]);
    setPointer(0);
    const pictures: GiphyPic[] = (await callAPI(data.search)) as GiphyPic[];
    setPics([...pictures]);
  };

  const moveForward = async () => {
    const newpointer = Math.min(pointer + 3, 9);
    setPointer(newpointer);
  };
  const moveBackward = async () => {
    const newpointer = Math.max(pointer - 3, 0);
    setPointer(newpointer);
  };

  useEffect(() => {
    const newPics = pics.slice(pointer, pointer + 3);
    setDisplayPics([...newPics]);
  }, [pointer, pics]);
  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <Paper elevation={3}>
            <Stack
              direction="column"
              spacing={3}
              marginX={1}
              marginY={2}
              padding={2}
            >
              <Typography component="h1" variant="h3">
                Giphy
              </Typography>
              <FormInputText name="search" label="Search" control={control} />
              <FormInputText name="title" label="Title" control={control} />
              <FormInputDropdown
                name="location"
                control={control}
                label="Location"
                options={selectOption}
              />

              <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                Submit
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center" sx={{ px: 1 }}>
        {displayPics.map((pic) => (
          <Grid item key={pic.id} xs={12} md={6} lg={4}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <div className={styles.container}>
                  <img src={pic.url} alt={pic.title} loading="lazy" />
                  {searchData?.location === "1" && (
                    <div className={styles.topCenter}>{searchData?.title}</div>
                  )}
                  {searchData?.location === "2" && (
                    <div className={styles.bottomCenter}>
                      {searchData?.title}
                    </div>
                  )}
                  {searchData?.location === "3" && (
                    <div className={styles.belowCenter}>
                      {searchData?.title}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          sx={{ m: 2 }}
          onClick={moveBackward}
          disabled={pointer === 0}
          startIcon={<SkipPreviousIcon />}
        >
          Previous
        </Button>

        <Button
          variant="contained"
          sx={{ m: 2 }}
          onClick={moveForward}
          disabled={pointer === 9}
          endIcon={<SkipNextIcon />}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default Images;
