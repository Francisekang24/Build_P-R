import { useState } from "react";
import { X } from "lucide-react";
import { Accordion, AccordionItem, Button, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, image, Switch, Tooltip } from "@nextui-org/react";
import Navbar01 from "../data/templates/portfolios/components/navbars/Navbar_0001";
import { Introduction_01, Introduction_02 } from "../data/templates/portfolios/components/Introduction";
import { Aboutme_01, Aboutme_02 } from "../data/templates/portfolios/components/Aboutme";
import { Projects_01, Projects_02 } from "../data/templates/portfolios/components/Projects";



interface panelItem {
    title: string;
    id: number;
    content: JSX.Element[] | string[];
}


const panelItemsS: panelItem[] = [
    {
        title: "Home/Introduction",
        id: 1,
        content: [
            <Introduction_01 />,
            <Introduction_02 />
        ],
    },
    {
        title: "About Me",
        id: 2,
        content: [
            <Aboutme_01 />,
            <Aboutme_02 />
        ]
    },
    {
        title: "Portfolio/Projects",
        id: 3,
        content: [
            <Projects_01 />,
            <Projects_02 />
        ]
    },
    {
        title: "Resume/CV",
        id: 4,
        content: [<div>Resume option 1</div>, <div>Resume option 2</div>]
    },
    {
        title: "Skills",
        id: 5,
        content: [<div>Skills option 1</div>, <div>Skills option 2</div>]
    },
    {
        title: "Blog/Articles",
        id: 6,
        content: [<div>Blog option 1</div>, <div>Blog option 2</div>]
    },
    {
        title: "Testimonials/Recommendations",
        id: 7,
        content: [<div>Testimonials option 1</div>, <div>Testimonials option 2</div>]
    },
    {
        title: "Contact",
        id: 8,
        content: [<div>Contact option 1</div>, <div>Contact option 2</div>]
    },
    {
        title: "Social Links/Media",
        id: 9,
        content: [<div>Social Links option 1</div>, <div>Social Links option 2</div>]
    }
];

export default function Editor() {

    const [bg_color, setbg_Color] = useState('#878282');
    const [bg_image, setbg_Image] = useState('');

    interface ColorChangeEvent extends React.ChangeEvent<HTMLInputElement> { }

    const handleColorChange = (e: ColorChangeEvent) => {
        setbg_Color(e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setbg_Image(URL.createObjectURL(e.target.files[0]));
        }
    }

    const [panelItems, setPanelItems] = useState<panelItem[]>([]);
    const [selectedContentOptions, setSelectedContentOptions] = useState<{ [key: number]: number }>({});

    const addPanelItem = (item: panelItem) => {
        setPanelItems([...panelItems, item]);
        setSelectedContentOptions({ ...selectedContentOptions, [item.id]: 0 });
    };

    const removePanelItem = (id: number) => {
        setPanelItems(panelItems.filter((item) => item.id !== id));
        const newSelectedContentOptions = { ...selectedContentOptions };
        delete newSelectedContentOptions[id];
        setSelectedContentOptions(newSelectedContentOptions);
    }

    const [navbarItems, setNavbarItems] = useState<0 | 1 | 2>(0);

    const isItemAdded = (id: number) => {
        return panelItems.some(item => item.id === id);
    }

    const handleContentOptionChange = (panelId: number, optionIndex: number) => {
        setSelectedContentOptions({ ...selectedContentOptions, [panelId]: optionIndex });
    }

    return (
        <div className="flex h-screen">
            <div className="flex flex-col w-3/12 p-2">
                Panel
                <div className="border rounded-md h-full w-full bg-gray-300 overflow-y-auto">
                    <div className="flex flex-col space-y-2 p-2">
                        <h2 className="text-lg font-bold">Background</h2>
                        <div className="flex place-items-center items-center">
                            <div className="flex ">
                                <input
                                    type="color"
                                    value={bg_color}
                                    onChange={handleColorChange}
                                    className="hidden"
                                    id="colorInput"
                                />
                                <label
                                    htmlFor="colorInput"
                                    className="flex p-2 text-white text-xs font-semibold leading-4 rounded-md cursor-pointer border-2 border-gray-300"
                                    style={{ backgroundColor: bg_color }}
                                >
                                    Choose color
                                </label>
                            </div>
                            <div className="flex items-center justify-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="imageInput"
                                />
                                <label
                                    htmlFor="imageInput"
                                    className="flex p-2 text-white text-xs font-semibold leading-4 rounded-md cursor-pointer border-2 border-gray-300 overflow-auto"
                                >
                                    {bg_image ? bg_image.split('/').pop()?.slice(0, 20) : 'Upload image'}
                                </label>
                                <div>
                                    {bg_image && (
                                        <button
                                            onClick={() => setbg_Image('')}
                                            className="ml-2 p-1 text-xs text-white bg-red-500 rounded-md"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2 p-2">
                        <Accordion
                            selectionMode="multiple"
                        >
                            <AccordionItem
                                key={1}
                                title="Navbar"
                                classNames={{
                                    title: cn('text-lg font-bold'),
                                    content: cn('text-sm')
                                }}
                            >
                                <div className="flex gap-2">
                                    <Switch
                                        isSelected={navbarItems === 1}
                                        onChange={() => setNavbarItems(navbarItems === 1 ? 0 : 1)}
                                        classNames={{
                                            base: cn(
                                                "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                                                "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                                                "data-[selected=true]:border-primary",
                                            ),
                                            wrapper: "hidden",
                                            thumb: cn("hidden"),
                                        }}
                                    >
                                        <div className="flex flex-col gap-1">
                                            <p className="text-medium">Option 1</p>
                                        </div>
                                    </Switch>
                                    <Switch
                                        isSelected={navbarItems === 2}
                                        onChange={() => setNavbarItems(navbarItems === 2 ? 0 : 2)}
                                        classNames={{
                                            base: cn(
                                                "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                                                "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                                                "data-[selected=true]:border-primary",
                                            ),
                                            wrapper: "hidden",
                                            thumb: cn("hidden"),
                                        }}
                                    >
                                        <div className="flex flex-col gap-1">
                                            <p className="text-medium">Option 2</p>
                                        </div>
                                    </Switch>
                                </div>
                                Choose the the items to display in the navbar
                            </AccordionItem>
                        </Accordion>
                        <Accordion>
                            {panelItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    title={item.title}
                                    classNames={{
                                        title: cn('text-lg font-bold'),
                                        content: cn('text-sm')
                                    }}
                                >
                                    <div className="flex gap-2 flex-wrap">
                                        {item.content.map((content, index) => (
                                            <Switch
                                                key={index}
                                                isSelected={selectedContentOptions[item.id] === index}
                                                onChange={() => handleContentOptionChange(item.id, index)}
                                                classNames={{
                                                    base: cn(
                                                        "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                                                        "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                                                        "data-[selected=true]:border-primary",
                                                    ),
                                                    wrapper: "hidden",
                                                    thumb: cn("hidden"),
                                                }}
                                            >
                                                <div className="flex flex-col gap-1">
                                                    <p className="text-medium">Option {index + 1}</p>
                                                </div>
                                            </Switch>
                                        ))}
                                    </div>
                                    <Button
                                        color="danger"
                                        onClick={() => removePanelItem(item.id)}
                                    >
                                        Remove
                                    </Button>
                                </AccordionItem>
                            ))}
                        </Accordion>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="bordered"
                                >
                                    Add section
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                {panelItemsS.map((item) => (
                                    <DropdownItem
                                        key={item.id}
                                        onClick={() => !isItemAdded(item.id) && addPanelItem(item)}
                                        isDisabled={isItemAdded(item.id)}
                                    >
                                        <Tooltip content={isItemAdded(item.id) ? "Already added" : ""}>
                                            {item.title}
                                        </Tooltip>
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-1 p-2">
                Preview
                <div
                    className="border-2 border-gray-500 rounded-md h-full"
                    style={{
                        backgroundColor: bg_image ? 'transparent' : bg_color,
                        backgroundImage: bg_image ? `url(${bg_image})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    {/* Navbar */}
                    {navbarItems !== 0 && (
                        <div className="">
                            <Navbar01
                                variant={navbarItems === 1 ? 'Navbar_01' : 'Navbar_02'}
                                backgroundColor="#000"
                                textColor="#fff"
                                logo="Your Name"
                                links={[
                                    { label: "Home", href: "#" },
                                    { label: "About", href: "#" },
                                    { label: "Projects", href: "#" },
                                    { label: "Contact", href: "#" }
                                ]}
                            />
                        </div>
                    )}
                    {/* Panel Items */}
                    {panelItems.map((item) => (
                        <div key={item.id}>
                            {item.content[selectedContentOptions[item.id]]}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
