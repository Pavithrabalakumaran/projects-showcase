import './index.css'

const ProjectsShowCase = props => {
  const {projectDetails} = props
  const {name, imageUrl} = projectDetails

  return (
    <li className="list-container">
      <img src={imageUrl} className="image" alt="name" />
      <p className="para">{name}</p>
    </li>
  )
}

export default ProjectsShowCase
