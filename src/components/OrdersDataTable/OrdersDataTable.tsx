import {FC, useRef, Key, useState, useEffect} from 'react'
import {ICategory, IManager, IOrderLineBasic} from "../../store/types";
import {Dropdown, Typography, Table, InputRef, Input, Space, Button, DatePicker, MenuProps} from 'antd';
import type {TableProps} from 'antd';
import type {ColumnType} from 'antd/es/table';
import type {ColumnsType, FilterValue, SorterResult} from 'antd/es/table/interface';
import {SearchOutlined, FilterOutlined, CalendarOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import type {FilterConfirmProps} from 'antd/es/table/interface';
import dayjs, {Dayjs} from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'
import {DATE_FORMAT} from "../../helper/config";

const {Title} = Typography;

interface IRawOrderLine extends IOrderLineBasic {
    manager: string,
    category: string
}

type DataIndex = keyof IRawOrderLine;


interface OrdersDataTableProps {
    ordersData: IRawOrderLine[],
    managers: IManager[],
    categories: ICategory[]
}

export const OrdersDataTable: FC<OrdersDataTableProps> = ({ordersData, managers, categories}) => {


    dayjs.extend(isBetween);

    const {RangePicker} = DatePicker;
    const [tableDataSource, setTableDataSource] = useState<IRawOrderLine[]>(ordersData)
    const [dateFilter, setDateFilter] = useState<Array<Dayjs>>([]);
    const [isFilteredMode, setIsFilteredMode] = useState<boolean>(false)

    //handle reset filters
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<IRawOrderLine>>({});

    useEffect(() => {
        if (!isFilteredMode) {
            setTableDataSource(ordersData)
        }

    }, [isFilteredMode, ordersData])

    // Order search functionality
    const searchInput = useRef<InputRef>(null);
    const [searchText, setSearchText] = useState<string>('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };


    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const clearTableFilters = () => {
        setFilteredInfo({});
    };

    const clearTableSortings = () => {
        setSortedInfo({})
    }

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    }

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IRawOrderLine> => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{width: 90}}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({closeDropdown: false});
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{color: filtered ? '#1677ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });


    const getManagersFilterValues = () => {
        return managers.map(manager => ({text: manager.manager_name, value: manager.manager_name}))
    }
    const getCategoryFilterValues = () => {
        return categories.map(category => ({text: category.category_name, value: category.category_name}))
    }

    const columns: ColumnsType<IRawOrderLine> = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => {
                const {date: aDate} = a;
                const {date: bDate} = b;

                const aDayJs = dayjs(aDate, DATE_FORMAT);
                const bDayJs = dayjs(bDate, DATE_FORMAT);

                if (aDayJs.isBefore(bDayJs)) {
                    return 1;
                } else if (aDayJs.isAfter(bDayJs)) {
                    return -1;
                }

                return 0;
            },
            sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null,
        },
        {
            title: 'Order number',
            dataIndex: 'order_number',
            key: 'order_number',
            sorter: (a, b) => a.order_number - b.order_number,
            sortOrder: sortedInfo.columnKey === 'order_number' ? sortedInfo.order : null,
            filteredValue: filteredInfo.order_number || null,
            ...getColumnSearchProps('order_number'),
        },
        {
            title: 'Manager',
            dataIndex: 'manager',
            key: 'manager',
            filters: getManagersFilterValues(),
            filteredValue: filteredInfo.manager || null,
            onFilter: (value: React.Key | boolean, record) => record.manager.startsWith(value as string),
            sorter: (a, b) => {
                if (a.manager === b.manager) {
                    return 0;
                }
                if (a.manager < b.manager) {
                    return -1
                }
                return 1
            },
            sortOrder: sortedInfo.columnKey === 'manager' ? sortedInfo.order : null,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            filters: getCategoryFilterValues(),
            filteredValue: filteredInfo.category || null,
            key: 'category',
            onFilter: (value: React.Key | boolean, record) => record.category.startsWith(value as string),
            sorter: (a, b) => {
                if (a.category === b.category) {
                    return 0;
                }
                if (a.category < b.category) {
                    return -1
                }
                return 1
            },
            sortOrder: sortedInfo.columnKey === 'category' ? sortedInfo.order : null,
        },
        {
            title: 'Sum',
            dataIndex: 'sum',
            key: 'sum',
            render: (text) => {
                return <span>{Intl.NumberFormat('ru-ru').format(text)}</span>
            }
        },

    ];

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Button onClick={clearTableFilters}>Clear filters</Button>
            ),
        },
        {
            key: '2',
            label: (
                <Button onClick={clearTableSortings}>Clear sortings</Button>
            ),
        },
        {
            key: '3',
            label: (
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            ),
        },
    ];

    const handleFilterDate = () => {
        const filteredDataSource = ordersData.filter(order => {
            const orderDate = dayjs(order.date, DATE_FORMAT);
            if (!dateFilter.length) {
                return
            }
            const [dateBegin, dateEnd] = dateFilter;

            return orderDate.isBetween(dateBegin, dateEnd, 'day', '()') ? true : false;

        })

        setTableDataSource(filteredDataSource);
        setIsFilteredMode(true);

    }

    const handleTableChange: TableProps<IRawOrderLine>['onChange'] = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<IRawOrderLine>);
    };

    return (
        <>
            <div className="ordersDataTitle">
                <Title level={2}>
                    Order information
                </Title>
                <div className="table-service" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div className="date-filter">
                        <RangePicker
                            className="mr-3"
                            defaultValue={[
                                null,
                                null
                            ]}
                            format={DATE_FORMAT}
                            size={"large"}
                            onChange={(values) => {
                                if (!values) {
                                    setIsFilteredMode(false)
                                    setDateFilter([])
                                    return
                                }

                                const dateBegin = dayjs(values[0]);
                                const dateEnd = dayjs(values[1]);
                                setDateFilter([dateBegin, dateEnd]);
                            }}
                        />
                        <Button
                            type="primary"
                            size={"large"}
                            icon={<CalendarOutlined />}
                            onClick={handleFilterDate}
                        >
                            Filter Date
                        </Button>
                    </div>
                    <Dropdown menu={{items}} placement="bottomRight" arrow>
                        <Button icon={<FilterOutlined/>}>Clear filters</Button>
                    </Dropdown>

                </div>
                <Table
                    columns={columns}
                    onChange={handleTableChange}
                    dataSource={tableDataSource}
                    scroll={{x: 1500}}

                />
            </div>
        </>
    )
}

export default OrdersDataTable