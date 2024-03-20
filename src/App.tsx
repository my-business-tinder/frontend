import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Chats from "./Pages/Chats";
// import MyInterests from "./Pages/MyInterests";
import SimilarInterests from "./Pages/SimilarInterests";
import MeetNewPeople from "./Pages/MeetNewPeople";
import NotFoundPage from "./Pages/NotFound";
import MyAccount from "./Pages/MyAccount";
// import MyAccountChanges from "./Pages/MyAccountChanges";
// import Empty from "./Pages/EmptySearch"
import Cards from './Pages/SwipeCards'
// import Contacts from "./Pages/Contacts";
import {TelegramLogin} from "./Pages/TelegramLogin";
import HiddenUsers from "./Pages/HiddenUsers";
import OthersProfile from "./Pages/OthersProfile";
// import HiddenUsers from "./Pages/HiddenUsers";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/my-account' element={<MyAccount />} />
              <Route path='/similar-interests' element={<SimilarInterests />} />
              <Route path='/new-people' element={<MeetNewPeople />} />
              {/* <Route path="/other-profile/:id" element={<OthersProfile />} /> */}
              <Route path='/chats' element={<Chats />} />
              {/* <Route path='/my-account/interests' element={<MyInterests />} /> */}
              {/* <Route path='/my-account/changes' element={<MyAccountChanges />} /> */}
              {/* <Route path='/my-account/changes/contacts' element={<Contacts/>}/> */}
              {/* <Route path='/empty' element={<Empty />} /> */}
              <Route path='/cards' element={<Cards/>}/>
              <Route path='/login' element={<TelegramLogin/>}/>
              {/* <Route path='/hiddenUsers' element={<HiddenUsers/>}/> */}
              <Route path='*' element={<TelegramLogin/>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
