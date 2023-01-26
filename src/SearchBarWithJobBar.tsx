import { useState } from "react";
import "./styles/style.css";
import JobBar from "./jobBar";
import { Fade } from "react-reveal";
import TagsModal from "./TagsModal";

export default function SearchBarWithJobBar(props:any) {
  const [searchText, setSearchText] = useState("");
  const [searchTags, setSearchTags] = useState<any>(() => {
    return [];
  });
  const [modalShow, setModalShow] = useState(false);

  const handleChangeInput = (e:any) => setSearchText(e.target.value);
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (searchText) {
      if (searchTags.length > 4) {
        setModalShow(true);
      } else {
        const obj = { string: searchText, hoverState: false };
        setSearchTags((prevState:any) => [...prevState, obj]);
      }
    }
    setSearchText("");
  };
  return (
    <div>
      <div id="searchBarContainer">
        <Fade delay={150} duration={800}>
          <form onSubmit={handleSubmit}>
            <div id="searchBar">
              <input
                id="searchInput"
                onChange={handleChangeInput}
                value={searchText}
                placeholder="Search"
              ></input>
              <button id="searchButton">🔍</button>
              <div id="searchTagsDiv">
                {searchTags.length !== 0 ? (
                  searchTags.map((tag:any, index:any) => {
                    return !tag.hoverState ? (
                      <p
                        className="searchTagParagraph"
                        onMouseEnter={() => {
                          const newSearchTags = searchTags;
                          const newSearchTag = newSearchTags.find(
                            (el:any) => el.string === tag.string
                          );
                          newSearchTag.hoverState = true;
                          setSearchTags([...newSearchTags]);
                        }}
                      >
                        {tag.string}
                      </p>
                    ) : (
                      <div
                        className="searchTagWithDelete"
                        onMouseLeave={() => {
                          const newSearchTags = searchTags;
                          const newSearchTag = newSearchTags.find(
                            (el:any) => el.string === tag.string
                          );
                          newSearchTag.hoverState = false;
                          setSearchTags([...newSearchTags]);
                        }}
                        onClick={() => {
                          const newSearchTags = searchTags;
                          newSearchTags.splice(index, 1);
                          setSearchTags([...newSearchTags]);
                        }}
                      >
                        <p className="opacity0">{tag.string}</p>
                        <p className="positionAbsolute">X</p>
                      </div>
                    );
                  })
                ) : (
                  <p className="placeholderText">
                    Type something to search job..
                  </p>
                )}
              </div>
            </div>
          </form>
        </Fade>
      </div>
      <Fade delay={350} duration={900}>
        <JobBar
          loggedUser={props.loggedUser}
          loggedAsAdmin={props.loggedAsAdmin}
          searchText={searchText}
          searchTags={searchTags.map((tag:any) => tag.string)}
        ></JobBar>
      </Fade>
      <TagsModal
        setSearchTags={() => setSearchTags([])}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
