import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Pagination from "@mui/material/Pagination";

export default function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({});

  useEffect(() => {
    let ignore = false;

    const startFetching = async () => {
      const url =
        "https://corsproxy.io/?" +
        encodeURIComponent(
          `https://pse.kominfo.go.id/static/json-static/ASING_TERDAFTAR/${
            page - 1
          }.json`
        );

      const fetchData = await (await fetch(url)).json();
      if (!ignore) {
        setData(fetchData);
      }
    };
    startFetching();

    return () => {
      ignore = true;
    };
  }, [page]);

  const handleChange = (e, val) => {
    setPage(val);
  };

  if (data?.data) {
    return (
      <Stack sx={{ witdh: "100vw", alignItems: "center" }}>
        <TableContainer component={Paper} sx={{ width: "80vw" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {[
                  "No",
                  "Nama Sistem",
                  "Website",
                  "Sektor",
                  "Perusahaan",
                  "Tanggal Terbit"
                ].map((val) => (
                  <TableCell
                    key={val}
                    sx={{
                      fontWeight: 700,
                      fontSize: "12px",
                      lineHeight: "1.5rem"
                    }}
                  >
                    {val}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.map((val, ind) => (
                <TableRow
                  key={val.id}
                  sx={{ fontWeight: 400, fontSize: "12px" }}
                >
                  <TableCell sx={{ p: "8px" }}>
                    {data.meta.page.from + ind}
                  </TableCell>
                  <TableCell sx={{ p: "8px" }}>{val.attributes.nama}</TableCell>
                  <TableCell sx={{ p: "8px" }}>
                    {val.attributes.website}
                  </TableCell>
                  <TableCell sx={{ p: "8px" }}>
                    {val.attributes.sektor}
                  </TableCell>
                  <TableCell sx={{ p: "8px" }}>
                    {val.attributes.nama_perusahaan}
                  </TableCell>
                  <TableCell sx={{ p: "8px" }}>
                    {val.attributes.tanggal_daftar}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", width: "80%", mt: "20px" }}>
          <Pagination
            count={data.meta.page.lastPage}
            shape="rounded"
            variant="outlined"
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Stack>
    );
  }
}
