# Package: {{ data.name }}

## 📦 Basic Information

| **Property**    | **Details**                          |
|------------------|--------------------------------------|
| **Name**         | `{{ data.name }}`                   |
| **Version**      | `{{ data.version }}`                |
| **Type**         | {{ data.type }}                     |
| **Description**  | {{ data.description }} |
| **Keywords**     | {{ data.keywords }}      |

---

## 🛠️ Usage Details

### 🔗 Import Names
This package is imported with the following names in the project:

<ul>
  <li v-for="importName in data.importNames" :key="importName">{{ importName }}</li>
</ul>

---

### 📂 Usages Locations

#### Files and Locations

<div v-for="location in data.usagesLocations" :key="location.filePath">
  <h4>File: {{ location.filePath }}</h4>
  <table>
    <thead>
      <tr>
        <th>Import Name</th>
        <th>Line</th>
        <th>Type</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ location.importName }}</td>
        <td>{{ location.line }}</td>
        <td>{{ location.type }}</td>
      </tr>
    </tbody>
  </table>
</div>

---

## 🔍 Keywords

The package is associated with the following keywords:
<ul>
  <li v-for="keyword in data.keywords" :key="keyword">{{ keyword }}</li>
</ul>

---

## 🗂️ Notes

This markdown template is dynamically generated to document the use of external packages in your project. For more detailed analysis or questions, feel free to extend this structure as needed.
