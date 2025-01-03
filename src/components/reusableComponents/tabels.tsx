import { DataTable, DataTableSortStatus } from "mantine-datatable"
import { sortBy } from "lodash"
import { useEffect, useState } from "react"

// import { IRootState } from '../../store';
import Dropdown from "../../components/dropDown/Dropdown"
// import { setPageTitle } from '../../store/themeConfigSlice';
// import IconBell from '../../components/Icon/IconBell';
import IconCaretDown from "../../components/Icon/IconCaretDown"
import { tabelProps } from "../../types/types"
import { Link } from "react-router-dom"
import IconPencil from "../Icon/IconPencil"

import IconTrashLines from "../Icon/IconTrashLines"
import { useTranslation } from "react-i18next"
import CustomSelect from "./CustomSelect"
import useLanguage from "../../hooks/useLanguage"
import { formatDateTime } from "../../uitils/helpers"
import { PhotoView } from "react-photo-view"

const ColumnChooser = (props: tabelProps) => {
    console.log(props.pagination)
    const { t } = useTranslation()
    // const [props.TableBody, setprops.TableBody] = useState(props.TableBody);
    const [cols, setcols] = useState(props.tabelHead)
    console.log(props)
    // const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(setPageTitle('Checkbox Table'));
        setcols(props.tabelHead)
    })
    // const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;



    const isRtl = useLanguage()


    useEffect(() => {
        const handleWheel = (event:any) => {
          if (event.shiftKey) {
            event.preventDefault();
            const container = document.querySelector('.table-container');
            if (container) {
              container.scrollLeft += event.deltaY;
            }
          }
        };
    
        const container = document.querySelector('.table-container');
        if (container) {
          container.addEventListener('wheel', handleWheel);
        }
    
        return () => {
          if (container) {
            container.removeEventListener('wheel', handleWheel);
          }
        };
      }, []);
    // show/hide
    // const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100]
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
    const [initialRecords, setInitialRecords] = useState(sortBy(props.TableBody, cols[0]?.accessor))
    const [recordsData, setRecordsData] = useState(initialRecords)

    useEffect(() => {
        setInitialRecords(props.TableBody)
    }, [initialRecords, props.TableBody, props.page])

    const [selectedRecords, setSelectedRecords] = useState<any>([])
console.log(selectedRecords)
    // const [selectedId, setSelectedId] = useState(null);

    // const handleClick = (props: any) => {
    //     setSelectedId(props);
    // };

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "id",
        direction: "asc",
    })

    const [hideCols, setHideCols] = useState<any>(["ID", "age", "dob", "user", "cv", "role"])

    // const formatDate = (date: any) => {
    //     if (date) {
    //         const dt = new Date(date);
    //         const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
    //         const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
    //         return day + '/' + month + '/' + dt.getFullYear();
    //     }
    //     return '';
    // };

    const showHideColumns = (col: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols?.filter((d: any) => d !== col))
        } else {
            setHideCols([...hideCols, col])
        }
    }

    const columns = cols.map(({ accessor, title, render, titleClassName }) => ({
        accessor,
        title,
        sortable: true,
        hidden: hideCols.includes(accessor),
        titleClassName: titleClassName || "",
        render: render
            ? (props: any) => {
                  return <div>{render(props)}</div>
              }
            : accessor === "status"
            ? ({ status }: any) => (
                  <div>
                      {" "}
                      {status === 1 ? (
                          <>
                              <span className="text-primary">معلق</span>
                          </>
                      ) : status === 3 ? (
                          <>
                              <span className="text-danger">مرفوض</span>
                          </>
                      ) : (
                          <>
                              <span className="text-primary">مقبول</span>
                          </>
                      )}
                  </div>
              )
            : accessor === "action"
            ? (data: any) => (
                  <div className="flex  justify-between w-max  gap-4">
                      {props.Enabel_edit && (
                          <>
                              <button
                                  type="button"
                                  onClick={() => {
                                      props.onEdit(data)
                                      if (!props.Link_Navigation) {
                                          openModal()
                                      }
                                  }}
                              >
                                  <IconPencil />
                              </button>
                          </>
                      )}

                      {props.Enabel_delete && (
                          <button type="button" onClick={() => props.onDelete(data?.id)}>
                              <IconTrashLines />
                          </button>
                      )}
                      {/* <button type="button" className=" bg-[#E7F1FF] border-[1px] border-gray-200 border-solid text-primary  p-2 rounded-[8px]  " onClick={() => props.onView(data?.id)}>
                                                                <IconEye />
                                                            </button> */}
                  </div>
              )
            : accessor === "image"
            ? ({ image }: any) => (
                  <div className="flex  justify-between w-max  gap-3">
                     <PhotoView src={image?.original_url}>
        
                      <img src={image?.original_url} alt="" className="w-[50px] object-cover text-left  h-[50px] rounded-full" />
      </PhotoView>
                  </div>
              )
            : accessor === "created_at"
            ? ({ created_at }: any) => (
                  <div className="flex  justify-between w-max  gap-3">
                    {formatDateTime(new Date(created_at))}
                  </div>
              )
            : accessor === "updated_at"
            ? ({ updated_at }: any) => (
                  <div className="flex  justify-between w-max  gap-3">
                    {formatDateTime(new Date(updated_at))}
                  </div>
              )
            : accessor === "brochure"
            ? ({ brochure }: any) => (
                  <div className="flex  justify-between w-max  gap-3">
                      <PhotoView src={brochure?.original_url}>
        
        <img src={brochure?.original_url} alt="" className="w-[50px] text-left  h-[50px] rounded-full" />
</PhotoView>
                  </div>
              )
            : accessor === "layout"
            ? ({ layout }: any) => (
                  <div className="flex  justify-between w-max  gap-3">
                       <PhotoView src={layout?.original_url}>
        
        <img src={layout?.original_url} alt="" className="w-[50px] text-left  h-[50px] rounded-full" />
</PhotoView>
                  </div>
              )
            : accessor === "highlighted_in_apartment"
            ? ({ highlighted_in_apartment }: any) => {
                  return (
                      <div className="flex justify-between w-max gap-3">
                          <p>{highlighted_in_apartment ? t("tableForms.yes") : t("tableForms.no")}</p>
                      </div>
                  )
              }
            : undefined,
    }))

    // useEffect(() => {
    //     props.setPage(1);
    // }, [pageSize]);

    useEffect(() => {
        // const from = props?.page - 1 * pageSize; // 10

        // const to = from + pageSize;

        setRecordsData([...initialRecords.slice()])
    }, [props.page, pageSize, initialRecords])

    const openModal = () => {
        // dispatch(modalActions.openModal());
        props.openCloseModal((prevState) => !prevState)
        // props.resetEditData([]);
    }
    // useEffect(() => {
    //     setRecordsData(() => {

    //         if (props.searchValue === "") {
    //             return props.TableBody
    //         }
    //         return props?.TableBody?.filter((item) => {

    //             // if (props?.allCols) {
    //             //     return props?.allCols.some((key) => {
    //             // const itemValue = item[key]?.toString().toLowerCase();

    //             return item.id.toString() === props.searchValue.toString();

    //             // });
    //             // }

    //         });
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [props.searchValue, props.TableBody]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor)

        setRecordsData(sortStatus.direction === "desc" ? data.reverse() : data)
        // props.setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus])

    return (
        <div className="table-container" style={{ overflowX: 'auto' }}>
            {/* search and reset */}

            <div className="mb-">
                {/* selects filter */}
                <div className="w-full"></div>

                {props.enable_search && (
                    <div className="flex justify-center items-center gap-3 mb-3">
                        <div className="text-left w-full">
                            <input
                                type="text"
                                className="form-input p-[14.5px] !rounded-[8px] min-w-[150px]"
                                placeholder={t("tableForms.labels.search")}
                                value={props.searchValue}
                                onChange={(e) => {
                                    if (props.setSearch) {
                                        props.setSearch(e.target.value)
                                    }
                                }}
                            />
                        </div>
                        <div className="w-[100px]">
                            <button
                                onClick={props.resetFilters}
                                className="btn p-4 bg-[#F00] rounded-xl shadow-none text-white w-full"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row items-center gap-2 xl:gap-5 ltr:ml-auto rtl:mr-auto w-full justify-between">
                    <div className=" min-w-[180px] w-full">
                        <CustomSelect
                            // editOptionId={editOptionId}
                            options={props.cityOptions !== undefined ? props.cityOptions : []}
                            //   label={t("tableForms.labels.categoriesTitle")}
                            onChange={(value) => {
                                if (props.handleSelect) {
                                    props.handleSelect(value, "city")
                                }
                            }}
                        />
                    </div>
                    <div className=" min-w-[180px] w-full">
                        <CustomSelect
                            // editOptionId={editOptionId}
                            options={props.areaOptions !== undefined ? props.areaOptions : []}
                            //   label={t("tableForms.labels.categoriesTitle")}
                            onChange={(value) => {
                                if (props.handleSelect) {
                                    props.handleSelect(value, "area")
                                }
                            }}
                        />
                    </div>
                    <div className=" min-w-[180px] w-full">
                        <CustomSelect
                            // editOptionId={editOptionId}
                            options={props.developerOptions !== undefined ? props.developerOptions : []}
                            //   label={t("tableForms.labels.categoriesTitle")}
                            onChange={(value) => {
                                if (props.handleSelect) {
                                    props.handleSelect(value, "developer")
                                }
                            }}
                        />
                    </div>
                    {/* <Dropdown
                        placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                        btnClassName="!flex items-center border font-semibold border-[#019867] dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                        button={
                            <>
                                <span className="ltr:mr-1 rtl:ml-1 text-[#019867]">Status</span>
                                <IconCaretDown className="w-5 h-5 text-[#019867]" />
                            </>
                        }
                    >
                        <ul className="!min-w-[180px] z-0">
                            {cols.map((col, i) => {
                                return (
                                    <li
                                        key={i}
                                        className="flex flex-col"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        <div className="flex items-center px-4 py-1">
                                            <label className="cursor-pointer mb-0">
                                                <input
                                                    type="checkbox"
                                                    checked={!hideCols.includes(col.accessor)}
                                                    className="form-checkbox"
                                                    defaultValue={col.accessor}
                                                    onChange={(event: any) => {
                                                        setHideCols(event.target.value);
                                                        showHideColumns(col.accessor, event.target.checked);
                                                    }}
                                                />
                                                <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                                            </label>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </Dropdown> */}
                    
                    <div className="w-full flex items-center justify-end gap-3">
                    {props.enable_filter && (<div className="flex md:items-center md:flex-row flex-col gap-5">
                            <div className="dropdown">
                                <Dropdown
                                    placement={`${isRtl ? "bottom-end" : "bottom-start"}`}
                                    btnClassName="!flex items-center border font-semibold px-2 border-primary border-solid dark:border-[#253b5c] rounded-md py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                    button={
                                        <>
                                            <span className="ltr:mr-1 rtl:ml-1 text-primary">
                                                {" "}
                                                {t("tableForms.labels.types")}{" "}
                                            </span>
                                            <IconCaretDown className="w-5 h-5 text-primary" />
                                        </>
                                    }
                                >
                                    <ul className="!min-w-[270px] z-0">
                                        {props?.types?.map((type) => {
                                            return (
                                                <li
                                                    key={type.id}
                                                    className="flex flex-col"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                    }}
                                                >
                                                    <div className="flex items-center px-4 py-1">
                                                        <label className="cursor-pointer mb-0">
                                                            <input
                                                                type="checkbox"
                                                                className="form-checkbox"
                                                                onChange={() => {
                                                                    if (props.typesHandler) {
                                                                        props.typesHandler(type.id)
                                                                    }
                                                                }}
                                                            />
                                                            <span className="ltr:ml-2 rtl:mr-2">{type.name}</span>
                                                        </label>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>)}

                        <div className="flex  md:items-center md:flex-row flex-col gap-5">
                            <div className="dropdown">
                                <Dropdown
                                    placement={`${isRtl ? "bottom-end" : "bottom-start"}`}
                                    btnClassName="!flex items-center border  font-semibold border-primary border-solid dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                    button={
                                        <>
                                            <span className="ltr:mr-1 rtl:ml-1 text-primary">
                                                {" "}
                                                {t("tableForms.labels.columns")}{" "}
                                            </span>
                                            <IconCaretDown className="w-5 h-5 text-primary" />
                                        </>
                                    }
                                >
                                    <ul className="!min-w-[180px]  ">
                                        {cols.map((col, i) => {
                                            return (
                                                <li
                                                    key={i}
                                                    className="flex flex-col"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                    }}
                                                >
                                                    <div className="flex items-center px-4 py-1">
                                                        <label className="cursor-pointer mb-0">
                                                            <input
                                                                type="checkbox"
                                                                checked={!hideCols.includes(col.accessor)}
                                                                className="form-checkbox"
                                                                defaultValue={col.accessor}
                                                                onChange={(event: any) => {
                                                                    setHideCols(event.target.value)
                                                                    showHideColumns(col.accessor)
                                                                }}
                                                            />
                                                            <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                                                        </label>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>

                        <div className=" flex gap-2">
                            {selectedRecords?.length > 0 && selectedRecords ? (
                                <>
                                    <button className="btn bg-primary rounded-xl shadow-none text-white">
                                        <span className="mr-1">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M2 4H3.33333H14"
                                                    stroke="white"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M12.6666 3.99998V13.3333C12.6666 13.6869 12.5261 14.0261 12.2761 14.2761C12.026 14.5262 11.6869 14.6666 11.3333 14.6666H4.66659C4.31296 14.6666 3.97382 14.5262 3.72378 14.2761C3.47373 14.0261 3.33325 13.6869 3.33325 13.3333V3.99998M5.33325 3.99998V2.66665C5.33325 2.31302 5.47373 1.97389 5.72378 1.72384C5.97383 1.47379 6.31296 1.33331 6.66659 1.33331H9.33325C9.68687 1.33331 10.026 1.47379 10.2761 1.72384C10.5261 1.97389 10.6666 2.31302 10.6666 2.66665V3.99998"
                                                    stroke="white"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M6.66675 7.33331V11.3333"
                                                    stroke="white"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M9.33325 7.33331V11.3333"
                                                    stroke="white"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </span>
                                        Delete
                                    </button>
                                </>
                            ) : (
                                <></>
                            )}
                            {props.Page_Add ? (
                                <>
                                    <Link
                                        to={`${props.Link_Navigation}`}
                                        className="btn bg-primary rounded-full shadow-none text-white"
                                    >
                                        <span>
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M8 3.33331V12.6666"
                                                    stroke="white"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M3.33325 8H12.6666"
                                                    stroke="white"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </span>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    {props.showAddButton && (
                                        <button
                                            onClick={openModal}
                                            className="btn bg-gradient-to-r  from-[#000] to-[#000] rounded-full shadow-none text-white"
                                        >
                                            <span className="mr-2">
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M8 3.33331V12.6666"
                                                        stroke="white"
                                                        stroke-width="1.5"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                    <path
                                                        d="M3.33325 8H12.6666"
                                                        stroke="white"
                                                        stroke-width="1.5"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                            {t("tableForms.labels.btnAdd")}{" "}
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="panel mt-6">
                <div className="datatables z-10">
                    {/* @ts-ignore */}
                    <DataTable
                        className=""
                        records={recordsData}
                        columns={columns}
                        highlightOnHover
                        totalRecords={props?.pagination?.total}
                        recordsPerPage={props.pagination?.per_page}
                        page={props?.pagination?.current_page}
                        onPageChange={(p) => props.setPage(p)}
                        // recordsPerPageOptions={3}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to }) =>
                            `${t("tableForms.pagination.display")} ${from} ${t("tableForms.pagination.to")} ${to} ${t(
                                "tableForms.pagination.of"
                            )} ${props?.pagination?.total} ${t("tableForms.pagination.rows")}`
                        }
                        {...(props.Chcekbox && {
                            selectedRecords,
                            onSelectedRecordsChange: setSelectedRecords,
                        })}
                    />
                </div>
            </div>
        </div>
    )
}

export default ColumnChooser
