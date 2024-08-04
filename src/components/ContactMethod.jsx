import { Fragment } from "react";
import ContactMethodInput from "./ContactMethodInput";
import ContactMethodPick from "./ContactMethodPick";
import * as styles from  "../css/components/ContactMethod.css.ts";

function ContactMethod({ user, handleChange, setUser , onContactVerified }) {
  return (
    <Fragment>
      <ContactMethodPick user={user} setUser={setUser} />

      <ContactMethodInput
        user={user}
        setUser={setUser}
        handleChange={handleChange}
        // onContactVerified={onContactVerified}
      />
      <h6
        className={`${styles.checkMessage} ${user.contact_id_Verified ? "" : styles.hidden}`}
      >
        중복입력 방지를 위해 확인버튼을 눌러주세요
      </h6>
    </Fragment>
  );
}

export default ContactMethod;
