import React, { useRef } from "react";
import { useDraggable } from "@dnd-kit/core";
import { nanoid } from "nanoid";

import { fields, FieldType } from "./fields";
import styles from '../../styles/playground.module.css'
import { ContentType, Schema } from "../../pages/contenttype/[uid]";


// Define the type for SidebarFieldProps
interface SidebarFieldProps {
  field: FieldType;
  overlay?: boolean; // Optional prop
}

export const SidebarField: React.FC<SidebarFieldProps> = (props) => {
  const { field, overlay } = props;
  const { title } = field;

  let className = "sidebar-field";
  if (overlay) {
    className += ` ${styles.dragOverlay}`;
  }

  return <div className={className}>{title}</div>;
};

// Define the type for DraggableSidebarFieldProps
interface DraggableSidebarFieldProps {
  field: FieldType;
  [key: string]: any; // Allow any other props
}

const DraggableSidebarField: React.FC<DraggableSidebarFieldProps> = (props) => {
  const { field, ...rest } = props;

  const id = useRef(nanoid());

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id.current,
    data: {
      field,
      fromSidebar: true,
    },
  });
  
  return (
    <div ref={setNodeRef} className={`${styles['sidebar-field']}`} {...attributes}>
      <div className={`${styles['sidebar-field-drag-handle']}`} {...listeners}>
        ...
      </div>
      <SidebarField field={field} {...rest} />
    </div>
  );
};



// Define the type for SidebarProps
interface SidebarProps {
  fieldsRegKey: string;
  contentType: ContentType;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { fieldsRegKey,contentType } = props;

  const fields: FieldType[] = convertContentTypeToFields(contentType);
  return (
    <div key={fieldsRegKey} className={styles.sidebar}>
      {fields.map((f) => (
        <DraggableSidebarField key={f.type} field={f} />
      ))}
    </div>
  );
};

function convertContentTypeToFields(contentType: ContentType): FieldType[] {
  const fields: FieldType[] = [];
  const processField = (field: Schema) => {
    if (field.data_type === "blocks" && field.blocks) {
      field.blocks.forEach((sub) =>
        fields.push({
          id: sub.uid,
          type: sub.uid,
          title: sub.title,
        })
      );
    }
    else{
      fields.push({
        id: field.uid,
        type: field.uid,
        title: field.display_name,
      });
    }
  };
  contentType.schema.forEach(processField);

  return fields;
}

export default Sidebar;
